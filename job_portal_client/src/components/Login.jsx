import React , { useState } from 'react';
import { auth } from '../firebase/firebase.config';
import {getAuth, signInWithEmailAndPassword ,GoogleAuthProvider , signInWithPopup } from "firebase/auth";
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

const auth = getAuth();
const googleProvider = new GoogleAuthProvider();

const handleLogin = async (event) => {
  event.preventDefault();
  setLoading(true);
  setError('');

  try {
    await signInWithEmailAndPassword(auth, email, password);
    // Handle successful login
  } catch (err) {
    setError('Failed to log in. Please check your email and password.');
  } finally {
    setLoading(false);
  }
};

const handleGoogleLogin = async () => {
  setLoading(true);
  setError('');

  try {
    await signInWithPopup(auth, googleProvider);
    // Handle successful login
  } catch (err) {
    setError('Failed to log in with Google.');
  } finally {
    setLoading(false);
  }
};

return (
  <div className="login-container">
    <h2 className="login-heading">Log In</h2>
    <form className="login-form" onSubmit={handleLogin}>
      <div className="input-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p className="error-message">{error}</p>}
      <button type="submit" className="login-button" disabled={loading}>
        {loading ? 'Logging in...' : 'Log In'}
      </button>
    </form>
    <div className="social-login">
      <button className="google-login" onClick={handleGoogleLogin} disabled={loading}>
        Log In with Google
      </button>
    </div>
    <div className="login-footer">
      <a href="/register" className="register-link">Don't have an account? Register</a>
    </div>
  </div>
);
};
export default Login;
