import React from "react";
import {useOutletContext} from "react-router-dom";

// Components
import CurrentlyReading from "../components/home/currently-reading/CurrentlyReading";
import Challenges from "../components/home/challenges/Challenges";
import ReadRecently from "../components/home/read-recently/ReadRecently";
import WantToRead from "../components/home/want-to-read/WantToRead";

// Hooks
import useAuth from "../components/hooks/useAuth";

function HomePage() {
  const config = useOutletContext();
  const isAuth = useAuth({config});

  if(isAuth) {
    return (
      <div className="HomePage">
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
