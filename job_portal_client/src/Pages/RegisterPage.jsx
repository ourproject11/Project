import React, { useState } from 'react';
import './RegisterPage.css'; // Import the CSS file for the register page
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase.config'; // Ensure the correct path to your Firebase config

const RegisterPage = () => {
  const [registerAs, setRegisterAs] = useState('candidate');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false); 

  const handleRegister = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    setSuccess(false);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('Registration successful');
      setSuccess(true);
    } catch (err) {
      setError('Failed to register. Please check your details and try again.');
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='register-page'>
      <h2 className='register-title'>Register</h2>
      {loading && <div className="loading-spinner"></div>}
      {success && (
        <div className="registration-popup">
      <p className="success-message">Registration successful!  😊</p>
      </div>
      )}
      <form onSubmit={handleRegister}>
        <div className='register-input-group'>
          <label htmlFor='registerAs'>Register As:</label>
          <select 
            id='registerAs' 
            name='registerAs' 
            className='register-input'
            value={registerAs}
            onChange={(e) => setRegisterAs(e.target.value)}
          >
            <option value='candidate'>Candidate</option>
            <option value='employer'>Employer</option>
          </select>
        </div>
        <div className='register-input-group'>
          <label htmlFor='name'>Name:</label>
          <input 
            type='text' 
            id='name' 
            name='name' 
            className='register-input' 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required 
          />
        </div>
        <div className='register-input-group'>
          <label htmlFor='email'>Email Address:</label>
          <input 
            type='email' 
            id='email' 
            name='email' 
            className='register-input' 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>
        <div className='register-input-group'>
          <label htmlFor='phone'>Phone Number:</label>
          <input 
            type='tel' 
            id='phone' 
            name='phone' 
            className='register-input' 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required 
          />
        </div>
        <div className='register-input-group'>
          <label htmlFor='password'>Password:</label>
          <input 
            type='password' 
            id='password' 
            name='password' 
            className='register-input' 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <div className='register-actions'>
          <button type='submit' className='register-button register-button-submit' disabled={loading}>
          {loading ? 'Wait a moment while we register you...' : 'Register'}
          </button>
        </div>
      </form>
      <p className='register-login-now'>Already have an account? <Link to="/login" className='register-login-now-button'>Log In Now</Link></p>
    </div>
  );
};

export default RegisterPage;
