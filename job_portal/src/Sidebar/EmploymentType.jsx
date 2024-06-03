import React from 'react';
import Inputfield from '../components/InputField';
import './EmploymentType.css'; // Ensure this path is correct based on your project structure

const EmploymentType = ({ handleChange }) => {
  return (
    <div>
      <h4 className='employment-title'>Type of Employment</h4>
      <div>
        <label className='side-label-container'>
          <input type="radio" name="test" id="test" value="" onChange={handleChange} />
          <span className='checkmark'></span>Any Experience
        </label>

        <Inputfield handleChange={handleChange} value="Internship" title="Internship" name="test" />
        <Inputfield handleChange={handleChange} value="full-time" title="Full-time" name="test" />
        <Inputfield handleChange={handleChange} value="part-time" title="Part-time" name="test" />
      </div>
    </div>
  );
};

export default EmploymentType;
