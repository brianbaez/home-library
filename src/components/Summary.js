import React from "react";

const homeLibraryImg = require("../assets/images/home-library.jpg");
const redRisingImg = require("../assets/images/red-rising.jpg");

function Summary() {
  return (
    <div className="Summary">
      <div className="container mt-5">
        <h2 className="text-center mb-5">It's never been easier to catalog your <strong>HomeLibrary</strong>, no matter the size of your collection.</h2>

        <div className="d-flex flex-column-reverse flex-lg-row">
          <div className="mt-5 mt-lg-0">
            <h2>Why You Should Catalog Your <strong>HomeLibrary</strong></h2>
            <h3 className="mt-4">Easily track which <strong>books</strong> you own so you don't accidentally buy one you already own!</h3>
            <h3 className="mt-4">Create <strong>book lists</strong> you can share with family and friends.</h3>
          </div>

          <div className="text-center ms-lg-5">
            <img className="img-fluid" src={homeLibraryImg} alt="home-library"></img>
          </div>
        </div>

        <div className="d-flex flex-column-reverse flex-lg-row-reverse mt-5">
          <div className="mt-5 mt-lg-0">
            <h2>Keep Track of Your <strong>Reading</strong></h2>
            <h3 className="mt-4">See how your <strong>reading habits</strong> develop over time by logging your <strong>reading sessions</strong>.</h3>
            <h3 className="mt-4">We'll show you <strong>charts and graphs</strong> that are fun to see.</h3>
          </div>

          <div className="text-center me-lg-5">
            <img className="img-fluid" src={redRisingImg} alt="red-rising"></img>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Summary;
