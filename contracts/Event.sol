// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract EventNFT is ERC721URIStorage, Ownable {
    enum EventStatus { Past, Upcoming }
    uint public _tokenIds;
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
    Event ev;

    //Error
    

    // Events
    event EventCreated(string name, string description, uint256 dateTime, uint256 numOfTickets, string venue, string nftURI, address organizationAddress);
    event ParticipantAdded(address indexed participant, uint256 eventId);


    // Mapping from participant address to event ID
    mapping(address => uint256) public participantEvents;

    constructor(string memory _eventName, string memory _eventDescription, uint256 _dateTime, uint256 _numOfTickets, string memory _venueLink, string memory _nftURI ) ERC721("EventNFT", "ENFT") Ownable(msg.sender) {
        ev = Event(_eventName,_eventDescription,_dateTime,_numOfTickets,_venueLink,_nftURI,msg.sender,EventStatus.Upcoming,new address[](0));
        emit EventCreated(_eventName, _eventDescription, _dateTime, _numOfTickets, _venueLink, _nftURI, msg.sender);
    }

    // Add participant to the event
    function addParticipant() external returns(uint) {
        require(msg.sender != ev.organizationAddress, "Organization cannot be a participant");
        require(ev.status == EventStatus.Upcoming, "Event must be upcoming");
        require(ev.participants.length < ev.numOfTickets,"No more tickets available");
        require(getEventStatus() == EventStatus.Upcoming,"Event ended");
        require(_tokenIds < ev.numOfTickets, "No of slots over");
        _tokenIds++;
        uint newtokenId = _tokenIds;
        _mint(msg.sender, newtokenId);
        _setTokenURI(newtokenId, ev.nftURI);
        
        return newtokenId;
    }

    // Get event status
    function getEventStatus() public  view returns (EventStatus) {
        

        if (ev.dateTime <= block.timestamp) {
            return EventStatus.Past;
        } else {
            return EventStatus.Upcoming;
        }
    }
}