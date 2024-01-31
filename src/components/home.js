// Import React and necessary dependencies
import React from 'react';
import '../css/home.css';

// Home component
const Home = () => {
  return (
    <div className="home-container">
      {/* Header section */}
      <header>
        <h1>We are the one stop platform for Every Event </h1>
      </header>

      {/* Login button */}
      <div className="login-button-container">
        <button className="login-button">Login</button>
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
};

// Export the Home component
export default Home;
