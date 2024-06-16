import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  const db = getFirestore();

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log('User data:', userData);
        navigateBasedOnRole(userData.role);
      } else {
        setError('Failed to retrieve user role. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Failed to log in. Please check your email and password.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log('User data:', userData);
        navigateBasedOnRole(userData.role);
      } else {
        setError('Failed to retrieve user role. Please try again.');
      }
    } catch (err) {
      console.error('Google login error:', err);
      setError('Failed to log in with Google.');
    } finally {
      setLoading(false);
    }
  };

  const navigateBasedOnRole = (role) => {
    if (role === 'candidate') {
      navigate('/candidate-dashboard');
    } else if (role === 'employee') {
      navigate('/employee-dashboard');
    } else {
      setError('Invalid user role. Please contact support.');
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
        <button
          type="submit"
          className="login-button"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Log In'}
        </button>
      </form>
      <div className="login-footer">
        <p>Don't have an account?</p>
        <Link to="/register" className="register-link">Register</Link>
      </div>
    </div>
  );
};

export default Login;
