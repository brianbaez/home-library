import React from "react";
import {Link} from "react-router-dom";

function AddEntryButton({isbn}) {
  return (
    <div className="AddEntryButton mt-3">
      <Link to={`/journal/${isbn}/add`}>
        <button className="btn btn-sm">Add Entry</button>
      </Link>
    </div>
  );
}

export default AddEntryButton;
