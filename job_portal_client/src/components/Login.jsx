import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-600 to-indigo-800">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Log In</h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-800 mb-1">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-gray-800 mb-1">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="bg-blue text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none transition duration-300 w-full"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
        <div className="mt-4">
          <button
            className="bg-red-500 text-white py-2 rounded-md w-full hover:bg-red-600 focus:outline-none transition duration-300"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            Log In with Google
          </button>
        </div>
        <div className="mt-4 text-center">
          <p className="text-gray-600">Don't have an account?</p>
          <a href="/register" className="text-blue-500 hover:underline">Register</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
