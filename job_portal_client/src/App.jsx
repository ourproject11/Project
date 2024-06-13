import React from 'react';
import { Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import './App.css';
import Navbar from './components/Navbar';

function App() {
  return (
    <AuthProvider>
      <Navbar/>
      <Outlet /> 
    </AuthProvider>
  );
}

export default App;
