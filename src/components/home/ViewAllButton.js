import React from "react";
import {Link} from "react-router-dom";

function ViewAllButton({bookshelf}) {
  return (
    <Link to={`/my-books/${bookshelf}`}>
      <button className="btn btn-sm">View All</button>
    </Link>
  );
}

export default ViewAllButton;
