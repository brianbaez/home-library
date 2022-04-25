import React, {useState, useEffect} from "react";
import axios from "axios";
import {useSearchParams, useLocation} from "react-router-dom";

function Browse() {
  const location = useLocation();
  const [error, setError] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search");

  const results = location.state.results;

  if(!search) {
    return (
      <div className="Browse">
        <div className="container home-content mt-3 mb-3">
          <h1>No results</h1>
        </div>
      </div>
    );
  }
  else {
    return (
      <div className="Browse">
        <div className="container home-content mt-3 mb-3">
          <h1>Search results for {search}</h1>
          {error && <span className="error-message">{error}</span>}
          <pre>{JSON.stringify(results, null, 2)}</pre>
        </div>
      </div>
    );
  }
}

export default Browse;
