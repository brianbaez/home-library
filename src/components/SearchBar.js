import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

function SearchBar() {
  let navigate = useNavigate();

  const [query, setQuery] = useState("");

  const [error, setError] = useState();

  const searchHandler = async (e) => {
    e.preventDefault();

    if(query) {
      navigate(`/browse?search=${query}`);
    }
  }

  return (
    <div>
      <form className="d-flex" onSubmit={searchHandler}>
        <input className="form-control me-2" type="search" placeholder="Search books" aria-label="Search books" value={query} onChange={(e) => setQuery(e.target.value)}></input>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  );
}

export default SearchBar;
