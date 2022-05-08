import React, {useState, useEffect} from "react";

function Username({username, setUsername}) {
  return (
    <div className="Username mb-3">
      <p className="mb-1">Username</p>
      <input required type="text" className="form-control" id="floatingUsername" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}></input>
    </div>
  );
}

export default Username;
