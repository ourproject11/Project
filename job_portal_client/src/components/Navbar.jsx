import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from "react-icons/fa";
import { auth, db } from '../firebase/firebase.config';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            setRole(userDoc.data().role);
          } else {
            console.log("No such document!");
            setRole(null);
          }
        } catch (error) {
          console.error("Error fetching user role: ", error);
          setRole(null);
        }
      } else {
        setRole(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleMenuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate('/');
    }).catch((error) => {
      console.error("Error signing out: ", error);
    });
  };

  const commonNavItems = [
    { path: "/candidate-dashboard", title: "Search Job" },
  ];

  const candidateNavItems = [
    { path: "/salary", title: "Salary" },
  ];

  const employerNavItems = [
    { path: "/my", title: "My Jobs" },
    { path: "/salary", title: "Salary" },
    { path: "/post-job", title: "Post a Job" },
  ];

  return (
    <header className="container xl:px-24 px-4">
      <nav className="header">
        <Link to="/" className="flex items-center gap-2 text-3xl text-black">
          <img 
            src="/images/file.png" 
            width="51" 
            height="46" 
            alt="Icon description"
          />
          <span className='navbar-title'>HireHub</span>
        </Link>

        {user ? (
          <>
            <ul className="nav-items hidden sm:flex">
              {commonNavItems.map(({ path, title }) => (
                <li key={path} className="nav-item">
                  <NavLink 
                    to={path} 
                    className={({ isActive }) => isActive ? "active text-black" : "text-black"}
                    activeClassName="text-blue-600"
                  >
                    {title}
                  </NavLink>
                </li>
              ))}
              {(role === 'candidate' ? candidateNavItems : employerNavItems).map(({ path, title }) => (
                <li key={path} className="nav-item">
                  <NavLink 
                    to={path} 
                    className={({ isActive }) => isActive ? "active text-black" : "text-black"}
                    activeClassName="text-blue-600"
                  >
                    {title}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="auth-links hidden sm:flex">
              <button onClick={handleLogout} className="py-2 px-5 border rounded">
                Log Out
              </button>
            </div>
          </>
        ) : (
          <div className="auth-links hidden sm:flex">
            <Link to="/login" className="py-2 px-5 border rounded">Log In</Link>
            <Link to="/register" className="py-2 px-5 border rounded signup">Register Now</Link>
          </div>
        )}

        <div className="mobile-menu-button sm:hidden">
          <button onClick={handleMenuToggler}>
            {isMenuOpen ? <FaTimes className="icon" /> : <FaBars className="icon" />}
          </button>
        </div>
      </nav>

      {user && (
        <div className={`mobile-menu ${isMenuOpen ? "visible" : "hidden"}`}>
          <ul>
            {commonNavItems.map(({ path, title }) => (
              <li key={path} className="text-base py-1">
                <NavLink 
                  to={path} 
                  className={({ isActive }) => isActive ? "active text-black" : "text-black"}
                  activeClassName="text-blue-600"
                >
                  {title}
                </NavLink>
              </li>
            ))}
            {(role === 'candidate' ? candidateNavItems : employerNavItems).map(({ path, title }) => (
              <li key={path} className="text-base py-1">
                <NavLink 
                  to={path} 
                  className={({ isActive }) => isActive ? "active text-black" : "text-black"}
                  activeClassName="text-blue-600"
                >
                  {title}
                </NavLink>
              </li>
            ))}
            <li className="text-base py-1">
              <button onClick={handleLogout} className="py-2 px-5 border rounded text-black">
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
