import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import Web3 from "web3";
import "../css/home.css";

export default function Home() {
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
    <div className="home-container">
      {/* Header section */}
      <header>
        <h1>We are the one stop platform for Every Event </h1>
      </header>

      {/* Login button */}
      <div className="login-button-container">{
        !isConnected && 
        <button className="login-button" onClick={connectWallet}>Login</button>
      }
      </div>

      {/* About section */}
      <section className="about-section">
        <h2>About Us</h2>
        <p>
          Welcome to our events platform! Discover and host amazing events with ease.
          Whether you are planning a conference, party, or workshop, we've got you covered.
          Join us to streamline your event management process.
        </p>
      </section>
    </div>
  );
}