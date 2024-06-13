// src/components/WelcomePage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './Welcome.css';
import welcomeImg from '../assets/welcomeImg.jpg';

function Welcome() {
  return (
    <div className="welcome-container">
      <header className="welcome-header">
        <div className="welcome-content">
          <h1 className="welcome-title">Welcome to Our Job Portal</h1>
          <p className="welcome-subtitle">Find your dream job with us. Register, login, and start exploring now!</p>
          <div className="welcome-buttons">
            <Link to="/register" className="btn">Register</Link>
            <Link to="/login" className="btn">Login</Link>
          </div>
        </div>
        <div className="welcome-image-container">
          <img src={welcomeImg} alt="Welcome" className="welcome-image" />
        </div>
      </header>
      <section className="welcome-features">
        <div className="feature">
          <h2>Search for Jobs</h2>
          <p>Access thousands of job listings from top companies.</p>
        </div>
        <div className="feature">
          <h2>Create a Profile</h2>
          <p>Build your profile and let employers find you.</p>
        </div>
        <div className="feature">
          <h2>Get Job Alerts</h2>
          <p>Receive notifications for new job postings that match your criteria.</p>
        </div>
      </section>
      <footer className="welcome-footer">
        <p>© 2024 Job Portal. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Welcome;
