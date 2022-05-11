import React from "react";

function Icon(props) {
  return (
    <div className="d-flex justify-content-center mb-3">
      <div className="Icon d-flex justify-content-center align-items-center">
        <i className={props.icon}></i>
      </div>
    </div>
  );
}

export default Icon;
