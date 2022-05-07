import React from "react";
import {useOutletContext, useParams} from "react-router-dom";

// Components
import Journal from "../components/journal/Journal";

// Hooks
import useAuth from "../components/hooks/useAuth";

function JournalPage() {
  const config = useOutletContext();
  const {isbn} = useParams();
  const isAuth = useAuth({config});
  const journalProps = {config, isbn};

  if(isAuth) {
    return (
      <div className="JournalPage">
        <Journal {...journalProps}/>
      </div>
    );
  }
}

export default JournalPage;
