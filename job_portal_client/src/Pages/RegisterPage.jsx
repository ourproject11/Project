import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';
import { db, doc, setDoc } from 'firebase/firestore'; // Ensure the correct imports

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
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      await setDoc(doc(db, 'users', userId), {
        name: name,
        email: email,
        phone: phone,
        role: registerAs // Set the role based on the selection
      });

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-600 to-indigo-800">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Register</h2>
        {loading && <div className="loader"></div>}
        {success && (
          <div className="registration-popup">
            <p className="text-green-500 text-center mb-4">Registration successful! 😊</p>
          </div>
        )}
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="registerAs" className="text-gray-800 mb-1">Register As:</label>
            <select
              id="registerAs"
              name="registerAs"
              value={registerAs}
              onChange={(e) => setRegisterAs(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="candidate">Candidate</option>
              <option value="employer">Employer</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="name" className="text-gray-800 mb-1">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-800 mb-1">Email Address:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone" className="text-gray-800 mb-1">Phone Number:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-gray-800 mb-1">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none transition duration-300"
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Log In Now</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
