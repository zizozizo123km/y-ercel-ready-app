import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// Define the component
const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // If still loading the auth state, you might render a loading indicator or null
  // For simplicity, we can just return null and let the state change re-render
  if (isLoading) {
    return null; // Or <LoadingSpinner /> if you have one
  }

  // If authenticated, render the children/outlet components
  // Outlet is used when this component acts as a layout/wrapper for nested routes
  if (isAuthenticated) {
    return <Outlet />;
  }

  // If not authenticated, redirect to the login page
  // The 'replace' prop prevents adding the current location to the history stack
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;