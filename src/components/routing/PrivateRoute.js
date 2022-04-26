import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import Navbar from "../Navbar";

function PrivateRoute() {
  return localStorage.getItem("authToken")
  ?
    <>
      <Navbar />
      <Outlet />
    </>
  : <Navigate to="/signin" />
}

export default PrivateRoute;
