import React from 'react';

const Banner = ({ query, handleInputChange }) => {
  return (
    <div className='container mx-auto px-4 py-16'>
      <h1 className='text-4xl md:text-5xl font-bold text-center mb-4 mt-8'>
        Discover your<span className='text-blue-500'> next career</span> move
      </h1>
      <p className='text-lg md:text-xl text-center mb-8'>
        Countless job opportunities across all sectors are available for you.
      </p>
      <div className='flex flex-col items-center'>
        <form className='w-full max-w-4xl flex flex-col md:flex-row gap-4 mb-8'>
          <div className='flex flex-col md:flex-row gap-4 flex-1'>
            <input
              type='text'
              name='title'
              id='title'
              placeholder='What position are you looking for?'
              className='w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
              onChange={handleInputChange}
              value={query}
            />
            <input
              type='text'
              name='location'
              id='location'
              placeholder='Location'
              className='w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
          <button type='submit' className='w-full md:w-auto bg-black text-white p-3 rounded-md hover:bg-blue-600 transition-colors duration-300'>
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Banner;
