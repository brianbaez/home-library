import React, {useState, useEffect} from "react";
import axios from "axios";
import useAuth from "../components/hooks/useAuth";

// Components
import CurrentlyReading from "../components/home/CurrentlyReading";
import Challenges from "../components/home/Challenges";
import ReadRecently from "../components/home/ReadRecently";
import WantToRead from "../components/home/WantToRead";

function HomePage() {
  const isAuth = useAuth({path: "home"});

  if(isAuth) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("authToken")}`
      }
    };

    return (
      <div className="Home">
        <div className="container home-content mt-3 mb-3">
          <div className="row row-cols-1 row-cols-lg-2">
            <CurrentlyReading config={config}/>
            <Challenges config={config}/>
            <ReadRecently config={config}/>
            <WantToRead config={config}/>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
