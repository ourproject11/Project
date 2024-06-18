import React from 'react';
import Location from './Location';
import Salary from './Salary';
import JobPostingData from './JobPostingData';
import WorkExperience from './WorkExperience';
import EmploymentType from './EmploymentType';

const Sidebar = ({ handleChange, handleClick }) => {
  return (
    <div className='sidebar-container bg-white shadow-lg rounded-lg p-4'>
      <h3 className='sidebar-title text-lg font-bold mb-4'>Filters</h3>
      
      {/* Location filter */}
      <div className="mb-4">
        <Location handleChange={handleChange} />
      </div>
      
      {/* Salary range filter */}
      <div className="mb-4">
        <Salary handleChange={handleChange} />
      </div>
      
      {/* Job posting date filter */}
      <div className="mb-4">
        <JobPostingData handleChange={handleChange} />
      </div>
      
      {/* Work experience level filter */}
      <div className="mb-4">
        <WorkExperience handleChange={handleChange} />
      </div>
      
      {/* Employment type filter */}
      <div className="mb-4">
        <EmploymentType handleChange={handleChange} />
      </div>
      
      {/* Apply filters button */}
      <button onClick={handleClick} className="bg-purple-600 text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-purple-700 transition duration-300 w-full">
        Apply Filters
      </button>
    </div>
  );
};

export default Sidebar;
