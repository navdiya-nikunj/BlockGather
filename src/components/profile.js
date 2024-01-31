import React, { useState, useEffect } from 'react';
import '../css/profile.css'// Import your CSS file for styling

const EditableField = ({ label, value, onChange }) => (
  <div className="editable-field">
    <label>{label}</label>
    <input type="text" value={value} onChange={(e) => onChange(e.target.value)} />
  </div>
);

const Profile = () => {
  const [organization, setOrganization] = useState('My Organization');
  const [website, setWebsite] = useState('https://www.example.com');
  const [discord, setDiscord] = useState('https://discord.gg/example');
  const [twitter, setTwitter] = useState('https://twitter.com/example');
  const [linkedin, setLinkedin] = useState('https://www.linkedin.com/company/example');
  const [instagram, setInstagram] = useState('https://www.instagram.com/example');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch data from a text file (simulating data retrieval)
    fetch('/Users/manavgoyal/Developer/Block-Panther/BlockGather/saveProfileData.txt')
      .then((response) => response.text())
      .then((data) => {
        const parsedData = JSON.parse(data);
        setOrganization(parsedData.organization);
        setWebsite(parsedData.website);
        setDiscord(parsedData.discord);
        setTwitter(parsedData.twitter);
        setLinkedin(parsedData.linkedin);
        setInstagram(parsedData.instagram);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Save data to a text file (simulating data storage)
    const dataToSave = {
      organization,
      website,
      discord,
      twitter,
      linkedin,
      instagram,
    };

    const jsonData = JSON.stringify(dataToSave);

    // Use your preferred method to save data (e.g., fetch API, axios, etc.)
    fetch('/path/to/saveProfileData.txt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonData,
    })
      .then(() => {
        setIsEditing(false);
        console.log('Data saved successfully!');
      })
      .catch((error) => console.error('Error saving data:', error));
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

export default Profile;
