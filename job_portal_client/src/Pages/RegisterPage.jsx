import React from 'react';
import './RegisterPage.css'; // Import the CSS file for the register page
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  return (
    <div className='register-page'>
      <h2 className='register-title'>Register</h2>
      <form>
        <div className='register-input-group'>
          <label htmlFor='registerAs'>Register As:</label>
          <select id='registerAs' name='registerAs' className='register-input'>
            <option value='candidate'>Candidate</option>
            <option value='employer'>Employer</option>
          </select>
        </div>
        <div className='register-input-group'>
          <label htmlFor='name'>Name:</label>
          <input type='text' id='name' name='name' className='register-input' required />
        </div>
        <div className='register-input-group'>
          <label htmlFor='email'>Email Address:</label>
          <input type='email' id='email' name='email' className='register-input' required />
        </div>
        <div className='register-input-group'>
          <label htmlFor='phone'>Phone Number:</label>
          <input type='tel' id='phone' name='phone' className='register-input' required />
        </div>
        <div className='register-input-group'>
          <label htmlFor='password'>Password:</label>
          <input type='password' id='password' name='password' className='register-input' required />
        </div>
        <div className='register-actions'>
          <button type='submit' className='register-button register-button-submit'>Register</button>
        </div>
      </form>
      <p className='register-login-now'>Already have an account? <Link to="/login" className='register-login-now-button'>Log In Now</Link></p>
    </div>
  );
};

export default RegisterPage;
