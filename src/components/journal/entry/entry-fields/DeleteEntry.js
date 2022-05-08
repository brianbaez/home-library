import React from "react";

function DeleteEntry({deleteHandler}) {
  return (
    <div className="DeleteEntry">
      <hr className="mt-3 mb-3"></hr>
      <a className="m-0" href="#" onClick={deleteHandler}>Delete</a>
    </div>
  );
}

export default DeleteEntry;
