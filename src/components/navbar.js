import React from 'react';
import { Link } from 'react-router-dom';
import MyButton from '../atoms/button';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>BlockGather</div>
      <div style={styles.navLinks}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/profile" style={styles.link}>Profile</Link>
        <Link to="/events" style={styles.link}>Events</Link>
      </div>
      <MyButton text="Connect Wallet" type="button" dataButton="connectWallet" />
    </nav>
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