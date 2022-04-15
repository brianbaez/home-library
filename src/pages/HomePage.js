import React from "react";
import useAuth from "../components/hooks/useAuth";

function HomePage() {
  const isAuth = useAuth({path: "home"});

  if(isAuth) {
    return (
      <div className="Home">
        <div className="container home-content mt-3 mb-3">
          <div className="row row-cols-1 row-cols-lg-2">
            <div className="col mb-3">
              <h4>Curently Reading</h4>
            </div>

            <div className="col mb-3">
              <h4>2022 Reading Challenge</h4>
            </div>

            <div className="col mb-3">
              <h4>Read Recently</h4>
            </div>

            <div className="col mb-3">
              <h4>Want to Read</h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
