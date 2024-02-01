// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
// pragma solidity --optimize = 200;

import {OrganizationContract} from "https://github.com/navdiya-nikunj/Solidity-Contracts/blob/main/org.sol";
contract OrganizationRegistry {
    
    address[]  organizationContracts;
    mapping(address => address) public organizationMapping;
    error OrganizationExisted();

    event OrganizationAdded(address indexed walletAddress, address indexed smartContractAddress);

    function addOrganization(address _walletAddress,string memory _name, string memory _discord, string memory _linkedin, string memory _twitter, string memory _desc) external  {
        if(organizationMapping[_walletAddress] != address(0)){
            revert OrganizationExisted();
        }

        // deploy organization.sol get it's address and store it.

        OrganizationContract neworg = new OrganizationContract(_name,_walletAddress,_discord,_linkedin,_twitter,_desc);
        address _smartContractAddress = address(neworg);
        organizationContracts.push(_smartContractAddress);
        organizationMapping[_walletAddress] = _smartContractAddress;

        emit OrganizationAdded(_walletAddress, _smartContractAddress);
    }

    function getAllOrganizations() external view returns (address[] memory) {
        return organizationContracts;
    }

}