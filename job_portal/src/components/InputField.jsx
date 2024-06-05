import React from 'react';
import './Inputfield.css';

const Inputfield = ({ handleChange, value, title, name }) => {
  return (
    <label className='side-label-container'>
      <input type='radio' name={name} value={value} onChange={handleChange} />
      <span className='checkmark'></span>{title}
    </label>
  );
};

export default Inputfield;
