import React from "react";

function Button(props) {
  return (
    <button type="button" className="btn me-3">{props.name}</button>
  );
}

export default Button;
