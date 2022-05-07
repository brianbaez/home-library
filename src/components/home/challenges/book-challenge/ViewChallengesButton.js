import React from "react";
import {Link} from "react-router-dom";

function ViewChallengesButton() {
  return (
    <Link to="/my-reading-challenges">
      <button className="btn btn-sm">View Challenges</button>
    </Link>
  );
}

export default ViewChallengesButton;
