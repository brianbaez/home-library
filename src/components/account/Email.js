import React, {useState, useEffect} from "react";

function Email({newEmail, setNewEmail}) {
  return (
    <div className="Email mb-3">
      <p className="mb-1">Email</p>
      <input required type="email" className="form-control" id="floatingEmail" placeholder="name@example.com" value={newEmail} onChange={(e) => setNewEmail(e.target.value)}></input>
    </div>
  );
}

export default Email;
