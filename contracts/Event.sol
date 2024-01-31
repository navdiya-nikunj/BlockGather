// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract EventNFT is ERC721, Ownable {
    enum EventStatus { Past, Upcoming }
    struct Event {
        string name;
        string description;
        uint256 dateTime;
        uint256 numOfTickets;
        string venue;
        string nftURI;
        address organizationAddress;
        EventStatus status;
        address[] participants;
    }

    // Events
    event EventCreated(string name, string description, uint256 dateTime, uint256 numOfTickets, string venue, string nftURI, address organizationAddress);
    event ParticipantAdded(address indexed participant, uint256 eventId);

    // Mapping from event ID to Event
    mapping(uint256 => Event) public events;

    // Mapping from participant address to event ID
    mapping(address => uint256) public participantEvents;

    // Counter for event IDs
    uint256 public eventIdCounter;

    constructor() ERC721("EventNFT", "ENFT") Ownable(msg.sender) {}

    // Create a new event
    function createEvent(
        string memory _name,
        string memory _description,
        uint256 _dateTime,
        uint256 _numOfTickets,
        string memory _venue,
        string memory _nftURI
    ) external onlyOwner {
        require(_dateTime > block.timestamp, "Event must be in the future");
        
        EventStatus status = (_dateTime > block.timestamp) ? EventStatus.Upcoming : EventStatus.Past;

        events[eventIdCounter] = Event({
            name: _name,
            description: _description,
            dateTime: _dateTime,
            numOfTickets: _numOfTickets,
            venue: _venue,
            nftURI: _nftURI,
            organizationAddress: msg.sender,
            status: status,
            participants: new address[](0)
        });

        emit EventCreated(_name, _description, _dateTime, _numOfTickets, _venue, _nftURI, msg.sender);
        _mint(msg.sender, eventIdCounter);
        eventIdCounter++;
    }

    // Add participant to the event
    function addParticipant(uint256 _eventId) external {
        Event storage eventInstance = events[_eventId];

        require(msg.sender != eventInstance.organizationAddress, "Organization cannot be a participant");
        require(eventInstance.status == EventStatus.Upcoming, "Event must be upcoming");
        require(eventInstance.participants.length < eventInstance.numOfTickets,"No more tickets available");

        transferFrom(eventInstance.organizationAddress, msg.sender, _eventId);

        eventInstance.participants.push(msg.sender);
        participantEvents[msg.sender] = _eventId;

        emit ParticipantAdded(msg.sender, _eventId);
    }

    // Get event status
    function getEventStatus(uint256 _eventId) external view returns (EventStatus) {
        Event storage eventInstance = events[_eventId];

        if (eventInstance.dateTime <= block.timestamp) {
            return EventStatus.Past;
        } else {
            return EventStatus.Upcoming;
        }
    }
}