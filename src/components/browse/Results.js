import React, {useState, useEffect} from "react";
import axios from "axios";

// Components
import BookResults from "./BookResults";

function Results(browseProps) {
  // Props
  const {config, query} = browseProps;
  const [results, setResults] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const fetchResults = async () => {
      await axios.get(`/api/browse?search=${query}`)
      .then((res) => {
        setResults(res.data.results);
      })
      .catch((error) => {
        setError(error.response.data.error);
      })
    }

    fetchResults();
  }, [query]);

  return (
    <div className="Results container home-content my-3">
      {!query
        ? <h1>No results</h1>
        :
        <div>
          {results &&
            <div className="ResultsContent">
              <h1 className="mb-5">Found {results.length} results for {query}</h1>
              {error && <span>{error}</span>}
              <BookResults config={config} results={results}/>
            </div>
          }
        </div>
      }
    </div>
  );
}

export default Results;
