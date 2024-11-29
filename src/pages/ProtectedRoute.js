import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../components/AuthProvider';

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth(); // Assuming useAuth provides a token or authentication status

  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
