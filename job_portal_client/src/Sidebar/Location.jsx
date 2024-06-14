import React from 'react';
import Inputfield from '../components/InputField';
import './Location.css'; // Ensure this path is correct based on your project structure

const Location = ({ handleChange }) => {
  return (
    <div>
      <h4 className='location-title'>Location</h4>
      <div>
        <label className='side-label-container'>
          <input type="radio" name="test" id="test" value="" onChange={handleChange} />
          <span className='checkmark'></span>All
        </label>

        <Inputfield handleChange={handleChange} value="london" title="Pune" name="test" />
        <Inputfield handleChange={handleChange} value="seattle" title="Bangalore" name="test" />
        <Inputfield handleChange={handleChange} value="boston" title="Kolkata" name="test" />
        <Inputfield handleChange={handleChange} value="mumbai" title="Mumbai" name="test" />
        <Inputfield handleChange={handleChange} value="usa" title="Delhi" name="test" />
      </div>
    </div>
  );
};

export default Location;
