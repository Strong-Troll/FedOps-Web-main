import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const ProtectedComponent = ({ component: Component, ...props }) => {
  const user = useAuth();

  return user ? <Component {...props} /> : <Navigate to="/login" replace />;
};

export default ProtectedComponent;
