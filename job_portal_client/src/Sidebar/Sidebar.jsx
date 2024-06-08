import React from 'react';
import Location from './Location';
import Salary from './Salary';
import JobPostingData from './JobPostingData';
import WorkExperience from './WorkExperience';
import EmploymentType from './EmploymentType';
import './Sidebar.css'; // Ensure this path is correct based on your project structure

const Sidebar = ({ handleChange, handleClick }) => {
  return (
    <div className='sidebar-container'>
      <h3 className='sidebar-title'>Filters</h3>
      <Location handleChange={handleChange} />
      <Salary handleChange={handleChange} handleClick={handleClick} />
      <JobPostingData handleChange={handleChange} />
      <WorkExperience handleChange={handleChange} />
      <EmploymentType handleChange={handleChange} />
    </div>
  );
};

export default Sidebar;
