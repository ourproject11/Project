import React from 'react';
import Location from './Location';
import JobPostingData from './JobPostingData';
import EmploymentType from './EmploymentType';
import './Sidebar.css';

const Sidebar = ({ handleChange, handleClick }) => {
  return (
    <div className='sidebar-container'>
      <h3 className='sidebar-title'>FILTERS</h3>
      
      {/* Location filter */}
      <div className="filter-section">
        <Location handleChange={handleChange} />
      </div>
      
      {/* Job posting date filter */}
      <div className="filter-section">
        <JobPostingData handleChange={handleChange} />
      </div>
      
      {/* Employment type filter */}
      <div className="filter-section">
        <EmploymentType handleChange={handleChange} />
      </div>
      
      {/* Apply filters button */}
      <button onClick={handleClick} className="apply-button">
        Apply Filters
      </button>
    </div>
  );
};

export default Sidebar;
