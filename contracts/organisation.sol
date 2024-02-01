// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface EventNFT {
    // Define interface for EventNFT contract
    function createEvent(string memory _eventName, string memory _eventDescription, uint256 _dateTime, uint256 _numOfTickets, string memory _venueLink, string memory _nftURI) external returns (address);
}

contract OrganizationContract {
    // Structure to store social channels and description
    struct Description {
        string discord;
        string linkedin;
        string twitter;
        string description;
    }
    
    // Organization details
    string public organizationName;
    address public organizationAddress;
    Description public organizationDescription;
    address[] public eventAddresses; // Array to store event addresses
    
    // Constructor to initialize organization details
    constructor(string memory _name, address _address, string memory _discord, string memory _linkedin, string memory _twitter, string memory _desc) {
        organizationName = _name;
        organizationAddress = _address;
        organizationDescription = Description(_discord, _linkedin, _twitter, _desc);
    }
    
    // Function to create events
    function createEvent(EventNFT _eventNFT, string memory _eventName, string memory _eventDescription, uint256 _dateTime, uint256 _numOfTickets, string memory _venueLink, string memory _nftURI) public {
        // Deploy event contract and get its address
        address eventAddress = _eventNFT.createEvent(_eventName, _eventDescription, _dateTime, _numOfTickets, _venueLink, _nftURI);
        
        // Store event address
        eventAddresses.push(eventAddress);
    }
    
    // Function to get all event addresses
    function getEvents() public view returns (address[] memory) {
        return eventAddresses;
    }
    
    // Function to update organization profile
    function updateProfile(string memory _name, string memory _discord, string memory _linkedin, string memory _twitter, string memory _desc) public {
        organizationName = _name;
        organizationDescription = Description(_discord, _linkedin, _twitter, _desc);
    }
}