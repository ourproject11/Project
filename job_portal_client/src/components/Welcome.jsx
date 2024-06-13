// src/components/Welcome.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import welcomeImg1 from '../assets/welcomeImg.jpg';

function Welcome() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-between">
      <header className="container mx-auto py-12 px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 md:order-2 md:ml-8 mb-8 md:mb-0 grid grid-cols-2 gap-4">
          <img src={welcomeImg1} alt="Welcome" className="rounded-lg shadow-lg mx-auto mt-4 col-span-1" style={{ maxWidth: '300px' }} />
          <img src={welcomeImg1} alt="Welcome" className="rounded-lg shadow-lg mx-auto mt-4 col-span-1" style={{ maxWidth: '300px' }} />
        </div>
        <div className="md:w-1/2 md:order-1 md:text-center px-4">
          <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-4 flex items-center justify-center">
            <span className="text-blue-500">Welcome to Our Job Portal </span>
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Finding the right job can transform lives. At our job portal, we are dedicated to connecting talented individuals with exciting career opportunities across various industries. Whether you are a seasoned professional looking for the next step in your career or a recent graduate embarking on your professional journey, our platform offers a comprehensive array of job listings tailored to meet diverse needs.
          </p>
          <div className="flex justify-center space-x-4 mt-8">
            <Link to="/register" className="bg-blue hover:bg-blue-600 text-white py-3 px-8 rounded-lg text-xl font-semibold">Register</Link>
            <Link to="/login" className="bg-green-500 hover:bg-green-600 text-white py-3 px-8 rounded-lg text-xl font-semibold">Login</Link>
          </div>
        </div>
      </header>

      <section className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Search for Jobs</h2>
            <p className="text-lg text-gray-700">Access thousands of job listings from top companies.</p>
          </div>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Create a Profile</h2>
            <p className="text-lg text-gray-700">Build your profile and let employers find you.</p>
          </div>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get Job Alerts</h2>
            <p className="text-lg text-gray-700">Receive notifications for new job postings that match your criteria.</p>
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 text-gray-300 py-4 text-center">
        <p>© 2024 Job Portal. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Welcome;
