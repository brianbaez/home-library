import React from "react";
import {useOutletContext, useParams} from "react-router-dom";

// Components
import Entry from "../components/journal/Entry";

// Hooks
import useAuth from "../components/hooks/useAuth";

function EntryPage() {
  const config = useOutletContext();
  const {isbn, entryID} = useParams();
  const isAuth = useAuth({config});
  const entryProps = {config, isbn, entryID};

  if(isAuth) {
    return (
      <div className="EntryPage">
        <Entry {...entryProps}/>
      </div>
    );
  }
}

export default EntryPage;
