import React from 'react';
import { FaEnvelopeOpenText, FaRocket } from 'react-icons/fa';
import './Newsletter.css';

const Newsletter = () => {
  return (
    <div className='newsletter-container'>
      <div className='newsletter-section'>
        <h3 className='newsletter-title'>
          <FaEnvelopeOpenText />
          Email me for jobs
        </h3>
        <p className='newsletter-description'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore, nesciunt!</p>
        <div className='newsletter-input-group'>
          <input type="email" name="email" id="email" placeholder="name@mail.com" className='newsletter-input'/>
          <input type="submit" value="Subscribe" className='newsletter-submit'/>
        </div>
      </div>

      <div className='newsletter-section'>
        <h3 className='newsletter-title'>
          <FaRocket />
          Get notice faster
        </h3>
        <p className='newsletter-description'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore, nesciunt!</p>
        <div className='newsletter-input-group'>
          <input type="submit" value="Upload your resume" className='newsletter-submit'/>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
