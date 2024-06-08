import React from 'react';
import './LoginPage.css'; // Import the CSS file for the login page
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className='login-page'>
      <h2 className='login-title'>Login</h2>
      <form>
        <div className='login-input-group'>
          <label htmlFor='loginAs'>Login As:</label>
          <select id='loginAs' name='loginAs' className='login-input'>
            <option value='candidate'>Candidate</option>
            <option value='employer'>Employer</option>
          </select>
        </div>
        <div className='login-input-group'>
          <label htmlFor='email'>Email Address:</label>
          <input type='email' id='email' name='email' className='login-input' required />
        </div>
        <div className='login-input-group'>
          <label htmlFor='password'>Password:</label>
          <input type='password' id='password' name='password' className='login-input' required />
        </div>
        <div className='login-actions'>
          <button type='submit' className='login-button login-button-submit'>Login</button>
        </div>
      </form>
      <p className='login-register-now'>Don't have an account? <Link to="/register" className='login-register-now-button'>Register Now</Link></p>
    </div>
  );
};

export default LoginPage;
