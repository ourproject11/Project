// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate , useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Home from '../Pages/Home';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  const role = currentUser.role; // Assuming role is part of user data
  const dashboardPath = role === 'candidate' ? '/candidate-dashboard' : '/employee-dashboard';

  if (location.pathname === '/' && Component === Home) {
    return <Navigate to={dashboardPath} />;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;
