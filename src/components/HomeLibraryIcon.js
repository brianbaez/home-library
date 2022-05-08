import React from "react";
import {Link} from "react-router-dom";

function HomeLibraryIcon() {
  return (
    <div className="HomeLibraryIcon text-center">
      <Link to="/">
        <i className="fa-solid fa-book-open fa-5x mb-2"></i>
        <h1>HomeLibrary</h1>
      </Link>
    </div>
  );
}

export default HomeLibraryIcon;
