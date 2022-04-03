import React from "react";

function Button(props) {
  console.log(props);
  return (
    <button type="button" className="btn me-3">{props.name}</button>
  );
}

export default Button;
