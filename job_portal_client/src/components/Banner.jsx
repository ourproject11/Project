import React from 'react';
import './Banner.css'; 

const Banner = ({ query, handleInputChange }) => {
  return (
    <div className='container'>
      <h1 className='heading'>
        Discover your <span className='highlight'>next career</span> move
      </h1>
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
          <input
            type='text'
            name='location'
            id='location'
            placeholder='Location'
            className='input'
          />
          <button type='submit' className='button'>
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Banner;
