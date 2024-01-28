import React from 'react';

const MyButton = (props) => {
    const { type, text, onClick, dataButton } = props;
  return (
    <>
      {onClick ? (
        <button type={type} onClick={onClick} style={styles.button}>
          {text}
        </button>
      ) : (
        <button type={type} style={styles.button}>{text}</button>
      )}
    </>
  );
};

const styles = {
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#fff',
    background: 'linear-gradient(to top, #4e54c8, #8f94fb)',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
    outline: 'none',
  },
};

export default MyButton;
