import React from "react";

function SaveButton({success, error}) {
  return (
    <div className="SaveButton mt-3">
      <button className="btn" type="submit">Save</button>
      {success && <span className="ms-3">{success}</span>}
      {error && <span className="ms-3">{error}</span>}
    </div>
  );
}

export default SaveButton;
