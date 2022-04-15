import React from "react";
import useAuth from "../components/hooks/useAuth";

function ReadingChallengesPage() {
  const isAuth = useAuth({path: "my-reading-challenges"});

  if(isAuth) {
    return (
      <div>
      </div>
    );
  }
}

export default ReadingChallengesPage;
