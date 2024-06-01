import React from 'react';
import { FiSearch } from 'react-icons/fi';
import './Banner.css';

const Banner = ({ query, handleInputChange }) => {
  return (
    <div className='container'>
      <h1 className='heading'>
        Find your<span className='highlight'> new job</span> today
      </h1>
      <p className='subheading'>
        Thousands of jobs in all sectors are waiting for you
      </p>
      <div className='form-container'>
        <form className='form'>
          <input
            type='text'
            name='title'
            id='title'
            placeholder='What position are you looking for?'
            className='input'
            onChange={handleInputChange}
            value={query}
          />
          <FiSearch className='search-icon' />
        </form>
      </div>
    </div>
  );
};

export default Banner;
