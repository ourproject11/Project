import React from 'react';
import './Banner.css'; // Import the new CSS file

const Banner = () => {
  return (
    <div className='container mx-auto xl:px-24 px-4 md:py-20 py-14'>
      <h1 className='heading'>
        Find your<span className='highlight'> new job</span> today
      </h1>
      <p className='subheading'>
        Thousands of jobs in all sectors are waiting for you
      </p>
      <form className='form-container'>
        <div className='form'>
          <input
            type='text'
            name='title'
            className='input'
            placeholder='Job title or keyword'
          />
          <button
            type='submit'
            className='button'
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default Banner;
