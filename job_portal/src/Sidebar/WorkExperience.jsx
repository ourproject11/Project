import React from 'react';
import Inputfield from '../components/InputField';
import './WorkExperience.css'; // Ensure this path is correct based on your project structure

const WorkExperience = ({ handleChange }) => {
  return (
    <div>
      <h4 className='work-experience-title'>Work Experience</h4>

      <div>
        <label className='side-label-container'>
          <input type="radio" name="test" id="test" value="" onChange={handleChange} />
          <span className='checkmark'></span>Any Experience
        </label>

        <Inputfield handleChange={handleChange} value="Internship" title="Internship" name="test" />
        <Inputfield handleChange={handleChange} value="work Remotely" title="Work Remotely" name="test" />
      </div>
    </div>
  );
};

export default WorkExperience;
