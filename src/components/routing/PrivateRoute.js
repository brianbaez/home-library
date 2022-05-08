import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';

// Components
import Navbar from "../Navbar";

function PrivateRoute() {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("authToken")}`
    }
  };

  return localStorage.getItem("authToken")
  ?
    <>
      <Navbar />
      <Outlet context={config}/>
    </>
  : <Navigate to="/signin" />
}

export default PrivateRoute;
