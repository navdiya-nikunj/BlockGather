import React, { useEffect, useState } from 'react';
import { Link , Outlet} from 'react-router-dom';
import MyButton from '../atoms/button';
import Web3 from 'web3';
import OrganizationABI from '../organizations.json';
import { ethers } from 'ethers';


const Navbar = () => {
  const contractAddress = "0xfab20cbdd95287271E199aE05a9e4C0347cD8E23";

  const [web3, setWeb3] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [showProfileButton, setShowProfileButton] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

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
          setWalletAddress(accounts[0]);
          console.log("Getting organization mapping for wallet address:", accounts[0]);
          const result = await contract.methods.organizationMapping(accounts[0]).call();
          if(result != "0x0000000000000000000000000000000000000000") {
            setShowProfileButton(true);
          }
        } catch (error) {
          console.error('Error calling smart contract function:', error);
          setShowProfileButton(false);
        }
      }
    };

    if (isConnected) {
      checkProfile();
    }
  }, [web3, isConnected]);
  const connectWallet = async () => {
    try {
      // Request account access if needed
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      setWeb3(new Web3(window.ethereum));
      setWalletAddress(web3.eth.accounts[0]);
      setIsConnected(true);
    } catch (error) {
      console.error('Error connecting to wallet:', error);
      setIsConnected(false);
    }
  };

  

  return (
    <>
      <nav style={styles.navbar}>
        <div style={styles.logo}>BlockGather</div>
        <div style={styles.navLinks}>
          <Link to="/" style={styles.link}>Home</Link>
          {
            showProfileButton &&
            <Link to="/profile" style={styles.link}>Profile</Link>
          }
          <Link to="/events" style={styles.link}>Events</Link>
        </div>
        {/* <MyButton text="Connect Wallet" type="button" dataButton="connectWallet" /> */}
        <div>
        {isConnected ? (
            `Connected As: ${walletAddress}`
          ) : (
            <button onClick={connectWallet}>Connect Wallet</button>
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    background: 'linear-gradient(to right, #4e54c8, #8f94fb)',
    color: '#fff',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#fff',
  },
  navLinks: {
    display: 'flex',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    marginLeft: '1.5rem',
    fontSize: '1rem',
    fontWeight: 'bold',
    transition: 'color 0.3s ease',
  },
};

export default Navbar;