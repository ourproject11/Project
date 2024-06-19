import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import './App.css';
import Navbar from './components/Navbar';
import './index.css';

function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/';

  return (
    <AuthProvider>
      {!hideNavbar && <Navbar />}
      <Outlet />
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
