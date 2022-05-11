import React, {useState, useEffect} from "react";
import axios from "axios";

// Components
import BookResults from "./BookResults";
import Loader from "../Loader";

function Results(browseProps) {
  // Props
  const {config, query} = browseProps;

  const [results, setResults] = useState();

  const [resultsLoading, setResultsLoading] = useState(true);

  const [error, setError] = useState();

  useEffect(() => {
    // Get results by query
    const fetchResults = async () => {
      await axios.get(`/api/private/browse?search=${query}`, config)
      .then((res) => {
        setResults(res.data.results);
        setResultsLoading(false);
      })
      .catch((error) => {
        setError(error.response.data.error);
      })
    }

    fetchResults();
  }, [query]);

  return (
    <div>
      {resultsLoading && <Loader />}
      {!resultsLoading &&
        <div className="Results container home-content my-3">
          {!query
            ? <h1>No results</h1>
            :
            <div>
              {results &&
                <div className="ResultsContent">
                  <h3 className="mb-3">Found {results.length} results for {query}</h3>
                  {error && <span>{error}</span>}
                  <BookResults config={config} results={results}/>
                </div>
              }
            </div>
          }
        </div>
      }
    </div>
  );
}

export default Results;
