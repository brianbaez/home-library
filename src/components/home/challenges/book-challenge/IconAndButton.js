import React from "react";

// Components
import ViewChallengesButton from "./ViewChallengesButton";

function IconAndButton() {
  return (
    <div className="IconAndButton d-flex flex-column align-items-center">
      <i className="fa-solid fa-book fa-7x mb-4"></i>
      <ViewChallengesButton />
    </div>
  );
}

export default IconAndButton;
