import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from "react-icons/fa";
import { auth } from '../firebase/firebase.config'; // Adjust the path if necessary
import { onAuthStateChanged, signOut } from "firebase/auth";
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleMenuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate('/'); // Redirect to homepage after logout
    }).catch((error) => {
      console.error("Error signing out: ", error);
    });
  };

  const navItems = [
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
            width="51" 
            height="46" 
            alt="Icon description"
          />
          <span className='navbar-title'>HireHub</span>
        </a>

        {user ? (
          <>
            <ul className="nav-items">
              <li className="nav-item">
                <NavLink 
                  to="/candidate-dashboard" 
                  className={({ isActive }) => isActive ? "active" : ""}
                >
                  Search Job
                </NavLink>
              </li>
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
              <button onClick={handleLogout} className="py-2 px-5 border rounded">
                Log Out
              </button>
            </div>
          </>
        ) : (
          <div className="auth-links">
            <Link to="/login" className="py-2 px-5 border rounded">Log In</Link>
            <Link to="/register" className="py-2 px-5 border rounded signup">Register Now</Link>
          </div>
        )}

        <div className="mobile-menu-button">
          <button onClick={handleMenuToggler}>
            {isMenuOpen ? <FaTimes className="icon" /> : <FaBars className="icon" />}
          </button>
        </div>
      </nav>

      {user && (
        <div className={`mobile-menu ${isMenuOpen ? "visible" : "hidden"}`}>
          <ul>
            <li className="text-base text-black py-1">
              <NavLink 
                to="/candidate-dashboard" 
                className={({ isActive }) => isActive ? "active" : ""}
              >
                Search Job
              </NavLink>
            </li>
            {navItems.map(({ path, title }) => (
              <li key={path} className="text-base text-black py-1">
                <NavLink 
                  to={path} 
                  className={({ isActive }) => isActive ? "active" : ""}
                >
                  {title}
                </NavLink>
              </li>
            ))}
            <li className="text-black py-1">
              <button onClick={handleLogout} className="py-2 px-5 border rounded">
                Log Out
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
