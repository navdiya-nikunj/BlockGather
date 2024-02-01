import React, { useState, useEffect } from 'react';
 // Import your CSS file for styling
import '../css/profile.css';
import orgABI from '../org.json';
import OrganizationABI from '../organizations.json';
import Web3 from 'web3';

const EditableField = ({ label, value, onChange }) => (
  <div className="editable-field">
    <label>{label}</label>
    <input type="text" value={value} onChange={(e) => onChange(e.target.value)} />
  </div>
);

export default function Profile() {

  const [organization, setOrganization] = useState('My Organization');
  const [website, setWebsite] = useState('https://www.example.com');
  const [discord, setDiscord] = useState('https://discord.gg/example');
  const [twitter, setTwitter] = useState('https://twitter.com/example');
  const [linkedin, setLinkedin] = useState('https://www.linkedin.com/company/example');
  const [instagram, setInstagram] = useState('https://www.instagram.com/example');
  const [isEditing, setIsEditing] = useState(false);

  const contractAddress = "0xfab20cbdd95287271E199aE05a9e4C0347cD8E23";

  const [web3, setWeb3] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [contractaddress, setContractaddress] = useState("");

  useEffect(() => {
    const initWeb3 = async () => {
      // Check if Web3 is injected by the browser
      if (window.ethereum) {
        const newWeb3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.enable();
          setWeb3(newWeb3);
          setIsConnected(true);
        } catch (error) {
          console.error('User denied account access');
        }
      } else if (window.web3) {
        // Legacy dApp browsers
        setWeb3(new Web3(window.web3.currentProvider));
        setIsConnected(true);
      } else {
        // Non-dApp browser
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
      
    };

    initWeb3();
  }, []);

  useEffect(() => {
    const initWeb3 = async () => {
      // Check if Web3 is injected by the browser
      if (window.ethereum) {
        const newWeb3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.enable();
          setWeb3(newWeb3);
          setIsConnected(true);
        } catch (error) {
          console.error('User denied account access');
        }
      } else if (window.web3) {
        // Legacy dApp browsers
        setWeb3(new Web3(window.web3.currentProvider));
        setIsConnected(true);
      } else {
        // Non-dApp browser
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
      
    };

    initWeb3();
  }, []);

  useEffect(() => {
    const checkProfile = async () => {
      if (web3 && isConnected) {
        // Replace the following line with the actual smart contract and function call
        const contract = new web3.eth.Contract(OrganizationABI, contractAddress);
        
        try { const accounts = await web3.eth.getAccounts();
          const result = await contract.methods.organizationMapping(accounts[0]).call();
          if(result != "0x0000000000000000000000000000000000000000") {
            setContractaddress(result);
            const orgcontract = new web3.eth.Contract(orgABI, result);
            const res1 = await orgcontract.methods.organizationName().call();
            const res2 = await orgcontract.methods.organizationDescription().call();
            // console.log("orgname:-", res1);
            setOrganization(res1);
            setWebsite(res2[3]);
            setDiscord(res2[0]);
            setLinkedin(res2[1]);
            setTwitter(res2[2]);
            // console.log("orgdesc:-", res2);
          }
          
        } catch (error) {
          console.error('Error calling smart contract function:', error);
        }
      }
    };

    if (isConnected) {
      checkProfile();
    }
  }, [web3, isConnected]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try{
      const accounts = await web3.eth.getAccounts();
      const orgcontract = new web3.eth.Contract(orgABI, contractAddress);
      orgcontract.methods.updateProfile(organization,discord,linkedin,twitter,website).send({from: accounts[0]}).then( (error, transactonHash) => {
        console.log(transactonHash);
    }).catch(error => {
      console.log(error);
    });

    }catch(error){
      console.log(error);
    }
    // Save data to a text file (simulating data storage)

  };

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <EditableField label="Organization" value={organization} onChange={setOrganization} />
      <EditableField label="Website" value={website} onChange={setWebsite} />
      <EditableField label="Discord" value={discord} onChange={setDiscord} />
      <EditableField label="Twitter" value={twitter} onChange={setTwitter} />
      <EditableField label="LinkedIn" value={linkedin} onChange={setLinkedin} />
      <EditableField label="Instagram" value={instagram} onChange={setInstagram} />

      {isEditing ? (
        <button className="save-button" onClick={handleSaveClick}>
          Save
        </button>
      ) : (
        <button className="edit-button" onClick={handleEditClick}>
          Edit
        </button>
      )}
    </div>
  );
};