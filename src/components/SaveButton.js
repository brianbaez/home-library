import React from "react";

function SaveButton({success, error}) {
  return (
    <div className="SaveButton">
      <button className="btn btn-sm" type="submit">Save</button>
      {success && <span className="ms-3">{success}</span>}
      {error && <span className="ms-3">{error}</span>}
    </div>
  );
}

export default SaveButton;
