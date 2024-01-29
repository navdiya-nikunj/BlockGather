// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract OrganizationContract {
    // Structure to store social channels and description
    struct Description {
        string discord;
        string linkedin;
        string twitter;
        string description;
    }
    
    // Structure to store event details
    struct Event {
        string eventName;
        string eventDescription;
        uint256 dateTime;
        uint256 numOfTickets;
        string venueLink;
        string nftURI;
        address eventContractAddress;
    }
    
    // Organization details
    string public organizationName;
    uint256 public organizationId;
    string public organizationAddress;
    Description public organizationDescription;
    mapping(uint256 => Event) public events; // Mapping to store events by their id
    uint256[] public eventIds; // Array to store event ids
    
    // Constructor to initialize organization details
    constructor(string memory _name, uint256 _id, string memory _address, string memory _discord, string memory _linkedin, string memory _twitter, string memory _desc) {
        organizationName = _name;
        organizationId = _id;
        organizationAddress = _address;
        organizationDescription = Description(_discord, _linkedin, _twitter, _desc);
    }
    
    // Function to get public storage stats
    function getStorageStats() public view returns (string memory, uint256, string memory, uint256[] memory) {
        return (organizationName, organizationId, organizationAddress, eventIds);
    }
    
    // Function to create events
    function createEvent(string memory _eventName, string memory _eventDescription, uint256 _dateTime, uint256 _numOfTickets, string memory _venueLink, string memory _nftURI) public {
        // Check if caller is the deployer address
        require(msg.sender == address(this), "Only deployer can create events");
        
        // Deploy event contract
        EventContract newEvent = new EventContract(_eventName, _eventDescription, _dateTime, _numOfTickets, _venueLink, _nftURI);
        
        // Store event details
        events[newEvent.eventId()] = Event(_eventName, _eventDescription, _dateTime, _numOfTickets, _venueLink, _nftURI, address(newEvent));
        eventIds.push(newEvent.eventId());
    }
}

contract EventContract {
    // Event details
    string public eventName;
    string public eventDescription;
    uint256 public dateTime;
    uint256 public numOfTickets;
    string public venueLink;
    string public nftURI;
    uint256 public eventId;
    
    // Constructor to initialize event details
    constructor(string memory _eventName, string memory _eventDescription, uint256 _dateTime, uint256 _numOfTickets, string memory _venueLink, string memory _nftURI) {
        eventName = _eventName;
        eventDescription = _eventDescription;
        dateTime = _dateTime;
        numOfTickets = _numOfTickets;
        venueLink = _venueLink;
        nftURI = _nftURI;
        eventId = block.number; // Using block number as event id (for demonstration purposes)
    }
}
