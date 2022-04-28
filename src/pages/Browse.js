import React, {useState, useEffect} from "react";
import axios from "axios";
import {useSearchParams, useLocation} from "react-router-dom";

// Components
import Results from "../components/browse/Results";

function Browse(defaultBookshelves) {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("search");

  return (
    <div className="Browse">
      <Results query={query}/>
    </div>
  );
}

export default Browse;
