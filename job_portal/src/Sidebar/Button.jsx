import React from 'react';
import './Button.css'; // Ensure this path is correct based on your project structure

const Button = ({ onClickHandler, value, title }) => {
  return (
    <button onClick={onClickHandler} value={value} className='custom-button'>
      {title}
    </button>
  );
};

export default Button;
