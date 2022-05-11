import React from "react";
import useAuth from "../components/hooks/useAuth";

function NotFound() {
  return (
    <div className="NotFound d-flex justify-content-center align-items-center">
      <div className="text-center">
        <h1>Oops!</h1>
        <h2>The page you are looking for was not found.</h2>
        <a className="btn mt-3" href="/">Back to the HomeLibrary homepage</a>
      </div>
    </div>
  );
}

export default NotFound;
