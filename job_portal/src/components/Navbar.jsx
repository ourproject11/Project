// Navbar.jsx

import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from "react-icons/fa";
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const navItems = [
    { path: "/", title: "Job Search" },
    { path: "/my", title: "My Jobs" },
    { path: "/salary", title: "Salary" },
    { path: "/post-job", title: "Post a Job" },
  ];

  return (
    <header className="container xl:px-24 px-4">
      <nav className="header">
        <a href="/" className="flex items-center gap-2 text-3xl text-black">
          <img 
            src="/images/file.png" 
            width="29" 
            height="30" 
            alt="Icon description"
          />
          <span>HireHub</span>
        </a>
        <ul className="nav-items">
          {navItems.map(({ path, title }) => (
            <li key={path} className="nav-item">
              <NavLink 
                to={path} 
                className={({ isActive }) => isActive ? "active" : ""}
              >
                {title}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="auth-links">
          <Link to="/login" className="py-2 px-5 border rounded">Log In</Link>
          <Link to="/register" className="py-2 px-5 border rounded signup">Register Now</Link>
        </div>

        <div className="mobile-menu-button">
          <button onClick={handleMenuToggler}>
            {isMenuOpen ? <FaTimes className="icon" /> : <FaBars className="icon" />}
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${isMenuOpen ? "visible" : "hidden"}`}>
        <ul>
          {navItems.map(({ path, title }) => (
            <li key={path} className="text-base text-white py-1">
              <NavLink 
                to={path} 
                className={({ isActive }) => isActive ? "active" : ""}
              >
                {title}
              </NavLink>
            </li>
          ))}
          <li className="text-white py-1">
            <Link to="/login">Log In</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
