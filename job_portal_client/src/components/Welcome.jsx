import React from 'react';
import { Link } from 'react-router-dom';
import welcomeImg1 from '../assets/file (4).png';
import './Welcome.css';
import userImage from '../assets/serach image.png'

function Welcome() {
  return (
    <div className="welcome-container">
      <header className="welcome-header">
        <div className="welcome-images">
          <img src={welcomeImg1} alt="Welcome" className="welcome-image" />
          {/* <img src={welcomeImg1} alt="Welcome" className="welcome-image" /> */}
        </div>
        <div className="welcome-content">
          <h1 className="welcome-title">Welcome to Your Career Odyssey</h1>
          <p className="welcome-subtitle">
            Finding the right job can transform lives. At our job portal, we are dedicated to connecting talented individuals with exciting career opportunities across various industries. Whether you are a seasoned professional looking for the next step in your career or a recent graduate embarking on your professional journey, our platform offers a comprehensive array of job listings tailored to meet diverse needs.
          </p>
          <div className="welcome-buttons">
            <Link to="/register" className="btn">Register</Link>
            <Link to="/login" className="btn">Login</Link>
          </div>
        </div>
      </header>

      <section className="welcome-how-it-works">
        <h2>How It Works</h2>
        <div className="how-it-works-steps">
          <div className="step">
            <h3>Register</h3>
            <p>Create an account and complete your profile.</p>
          </div>
          <div className="step">
            <h3>Search</h3>
            <p>Browse through thousands of job listings.</p>
          </div>
          <div className="step">
            <h3>Apply</h3>
            <p>Submit your application directly through our portal.</p>
          </div>
          <div className="step">
            <h3>Get Hired</h3>
            <p>Receive offers and start your new career.</p>
          </div>
        </div>
      </section>

      <section className="welcome-users-say">
        <h2>What Our Users Say</h2>
        <div className="user-feedback">
        <img src= {userImage} alt="User" className="user-image" />
          <p>"This job portal helped me find my dream job in just two weeks!" - Jane Doe</p>
          <p>"As an employer, I found the perfect candidate within days of posting my job listing." - John Smith</p>
        </div>
      </section>

      <footer className="welcome-footer">
        <p>© 2024 HireHub. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Welcome;
