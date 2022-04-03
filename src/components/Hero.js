import React from "react";

import Button from "./Button";

const harryPotterBooks = require("../assets/images/harry-potter-books.jpg");

function Hero() {
  return (
    <div className="Hero">
      <div className="container d-flex justify-content-between">
        <div className="title flex-fill d-flex flex-column justify-content-center">
          <h2 className="fw-regular">Your</h2>
          <h1 className="fw-bolder">HomeLibrary</h1>

          <div className="buttons d-flex">
            <Button name="Sign In"/>
            <Button name="Sign Up"/>
          </div>
        </div>

        <div className="Books d-none d-md-block ms-5">
          <img class="img-fluid" src={harryPotterBooks} alt="harry-potter-books"></img>
        </div>
      </div>
    </div>
  );
}

export default Hero;
