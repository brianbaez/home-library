import React from "react";

function Loader() {
  return (
    <div className="container mt-3">
      <div className="text-center">
        <div className="spinner-border" role="status"></div>
        <h2 className="sr-only">Loading...</h2>
      </div>
    </div>
  );
}

export default Loader;
