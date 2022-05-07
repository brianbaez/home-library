import React from "react";
import {useOutletContext, useSearchParams} from "react-router-dom";

// Components
import Results from "../components/browse/Results";

// Hooks
import useAuth from "../components/hooks/useAuth";

function BrowsePage() {
  const config = useOutletContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("search");
  const isAuth = useAuth({config});
  const browseProps = {config, query};

  if(isAuth) {
    return (
      <div className="BrowsePage">
        <Results {...browseProps}/>
      </div>
    );
  }
}

export default BrowsePage;
