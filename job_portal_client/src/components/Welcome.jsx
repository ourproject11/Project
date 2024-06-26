import React from 'react';
import { Link } from 'react-router-dom';
import welcomeImg1 from '../assets/file (4).png';
import userImage from '../assets/serach image.png';
import registerImage from '../assets/registerimg.png';
import searchImage from '../assets/searchimg.jpg';
import applyImage from '../assets/applyimg.jpg';
import hireImage from '../assets/hireimg.webp';
import janeImage from '../assets/janeimg.jpeg';
import johnImage from '../assets/johnimg.jpg';

const Welcome = () => {
  return (
    <div className="bg-gradient-to-b from-blue-100 to-white">
      {/* Header Section */}
      <header className="container mx-auto py-12 px-6 flex flex-col md:flex-row items-center justify-center md:justify-between bg-gradient-to-r from-blue-200 to-blue-400 rounded-lg shadow-md text-white">
        <div className="md:w-1/2 md:pr-12">
          <img src={welcomeImg1} alt="Welcome" className="mx-auto md:mx-0" style={{ maxWidth: '400px' }} />
        </div>
        <div className="md:w-1/2 text-center md:text-left mt-8 md:mt-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">Welcome to Your Career Odyssey</h1>
          <p className="text-lg mb-6 leading-relaxed text-black">
            Finding the right job can <span className="text-blue-600">transform lives</span>. At our job portal, we are dedicated to connecting talented individuals with exciting career opportunities across various industries. Whether you are a seasoned professional or a recent graduate, our platform offers a comprehensive array of job listings tailored to meet diverse needs.
          </p>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <Link to="/register" className="btn bg-blue hover:bg-black text-white py-3 px-6 rounded-md">
              Register
            </Link>
            <Link to="/login" className="btn bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-md">
              Login
            </Link>
          </div>
        </div>
      </header>

      {/* How It Works Section */}
      <section className="bg-gradient-to-b from-blue-200 to-blue-400 py-16">
        <div className="container mx-auto px-6 text-white">
          <h2 className="text-black text-3xl md:text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="flex flex-col items-center bg-white rounded-lg p-6 shadow-md">
              <img src={registerImage} alt="Register" className="w-22 h-20 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-black">Register</h3>
              <p className="text-gray-800 text-center">Create an account and complete your profile.</p>
            </div>
            <div className="flex flex-col items-center bg-white rounded-lg p-6 shadow-md">
              <img src={searchImage} alt="Search" className="w-20 h-20 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-black">Search</h3>
              <p className="text-gray-800 text-center">Browse through thousands of job listings.</p>
            </div>
            <div className="flex flex-col items-center bg-white rounded-lg p-6 shadow-md">
              <img src={applyImage} alt="Apply" className="w-20 h-20 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-black">Apply</h3>
              <p className="text-gray-800 text-center">Submit your application directly through our portal.</p>
            </div>
            <div className="flex flex-col items-center bg-white rounded-lg p-6 shadow-md">
              <img src={hireImage} alt="Get Hired" className="w-20 h-20 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-black">Get Hired</h3>
              <p className="text-gray-800 text-center">Receive offers and start your new career.</p>
            </div>
          </div>
        </div>
      </section>

      {/* User Feedback Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex flex-col items-center md:items-start text-center md:text-left bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img src={janeImage} alt="User" className="w-24 h-24 rounded-full mr-4" />
                <div>
                  <p className="text-lg text-gray-600 font-bold text-right">Hey, I am Jane Doe</p>
                  <p className="text-sm text-black text-right">"This job portal helped me find my dream job in just two weeks!"</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center md:items-start text-center md:text-left bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img src={johnImage} alt="User" className="w-24 h-24 rounded-full mr-4" />
                <div>
                  <p className="text-lg text-gray-600 font-bold text-right">Hey, I am John Smith</p>
                  <p className="text-sm text-black text-right">"As an employer, I found the perfect candidate within days of posting my job listing."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-blue-800 text-black py-4">
        <div className="container mx-auto text-center">
          <p>© 2024 HireHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Welcome;
