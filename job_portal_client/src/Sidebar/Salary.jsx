import React from 'react';
import Button from './Button';
import Inputfield from '../components/InputField';
import './Salary.css'; // Ensure this path is correct based on your project structure

const Salary = ({ handleChange, handleClick }) => {
  return (
    <div>
      <h4 className='salary-title'>Salary</h4>
      <div className='button-group'>
        <Button onClickHandler={handleClick} value="" title="Hourly" />
        <Button onClickHandler={handleClick} value="Monthly" title="Monthly" />
        <Button onClickHandler={handleClick} value="Yearly" title="Yearly" />
      </div>
      <div>
        <label className='side-label-container'>
          <input
            type="radio"
            name="test"
            id="test"
            value=""
            onChange={handleChange}
          />
          <span className='checkmark'></span>All
        </label>
        <Inputfield
          handleChange={handleChange}
          value={30}
          title="< 30000k"
          name="test2"
        />
        <Inputfield
          handleChange={handleChange}
          value={50}
          title="< 50000k"
          name="test2"
        />
        <Inputfield
          handleChange={handleChange}
          value={80}
          title="< 80000k"
          name="test2"
        />
        <Inputfield
          handleChange={handleChange}
          value={100}
          title="< 100000k"
          name="test2"
        />
      </div>
    </div>
  );
};

export default Salary;
