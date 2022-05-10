import React, {useState, useEffect} from "react";

function Username({newUsername, setNewUsername}) {
  return (
    <div className="Username mb-3">
      <p className="mb-1">Username</p>
      <input required type="text" className="form-control" id="floatingUsername" placeholder="Username" value={newUsername} onChange={(e) => setNewUsername(e.target.value)}></input>
    </div>
  );
}

export default Username;
