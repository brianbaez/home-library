import React from "react";
import {Link} from "react-router-dom";

// Components
import Button from "./Button";
const harryPotterBooks = require("../assets/images/harry-potter-books.jpg");

function Hero() {
  return (
    <div className="Hero">
      <div className="container d-flex">
        <img className="Books-background img-fluid d-sm-block d-lg-none" src={harryPotterBooks} alt="harry-potter-books"></img>

        <div className="title flex-fill d-flex flex-column justify-content-center">
          <h2 className="fw-regular">Your</h2>
          <h1 className="fw-bolder">HomeLibrary</h1>

          <div className="buttons d-flex">
            <Link to="/signin">
              <Button name="Sign In"/>
            </Link>
            <Link to="/signup">
              <Button name="Sign Up"/>
            </Link>
          </div>
        </div>

        <div className="Books d-none d-lg-block ms-5">
          <img className="img-fluid" src={harryPotterBooks} alt="harry-potter-books"></img>
        </div>
      </div>
    </div>
  );
}

export default Hero;
