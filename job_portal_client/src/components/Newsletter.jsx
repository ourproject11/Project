import React from 'react';
import { FaEnvelopeOpenText, FaRocket } from 'react-icons/fa';
import './Newsletter.css';

const Newsletter = () => {
  return (
    <div className='flex justify-center'>
      <div className='newsletter-container flex flex-col sm:flex-row gap-6'>
        <div className='newsletter-section bg-white shadow-lg p-4 rounded-lg'>
          <h3 className='newsletter-title text-lg font-semibold flex items-center'>
            <FaEnvelopeOpenText className='mr-2' />
            Email me for jobs
          </h3>
          <p className='newsletter-description text-sm text-gray-600'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore, nesciunt!</p>
          <div className='newsletter-input-group flex flex-col sm:flex-row items-center gap-4 mt-4'>
            <input type="email" name="email" id="email" placeholder="name@mail.com" className='newsletter-input p-2 border border-gray-300 rounded-lg w-full sm:w-2/3'/>
            <input type="submit" value="Subscribe" className='newsletter-submit p-2 bg-blue text-white rounded-lg cursor-pointer hover:bg-blue-700'/>
          </div>
        </div>

        <div className='newsletter-section bg-white shadow-lg p-4 rounded-lg mt-6 sm:mt-0'>
          <h3 className='newsletter-title text-lg font-semibold flex items-center'>
            <FaRocket className='mr-2' />
            Get notice faster
          </h3>
          <p className='newsletter-description text-sm text-gray-600'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore, nesciunt!</p>
          <div className='newsletter-input-group flex flex-col sm:flex-row items-center gap-4 mt-4'>
            <input type="submit" value="Upload your resume" className='newsletter-submit p-2 bg-green-600 text-white rounded-lg cursor-pointer hover:bg-green-700'/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
