import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute() {
  return localStorage.getItem("authToken") ? <Outlet /> : <Navigate to="/signin" />
}

export default PrivateRoute;
