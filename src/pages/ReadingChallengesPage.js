import React from "react";
import {useOutletContext} from "react-router-dom";

// Components
import ReadingChallenges from "../components/challenges/ReadingChallenges";

// Hooks
import useAuth from "../components/hooks/useAuth";

function ReadingChallengesPage() {
  const config = useOutletContext();
  const isAuth = useAuth({config});

  if(isAuth) {
    return (
      <div className="ReadingChallengesPage">
        <ReadingChallenges config={config}/>
      </div>
    );
  }
}

export default ReadingChallengesPage;
