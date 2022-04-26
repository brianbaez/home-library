import React, {useState, useEffect} from "react";
import axios from "axios";

function ReadRecently({config}) {
  const [readRecently, setReadRecently] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    console.log("Rendering ReadRecently...");

    const fetchReadRecently = async () => {
      await axios.get(`/api/private/bookshelves/read`, config)
      .then((res) => {
        setReadRecently(res.data.data)
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
    }

    fetchReadRecently();
  }, []);

  return (
    <div className="col mb-3">
      <h4>Read Recently</h4>
      {error && <span className="error-message">{error}</span>}
      <pre>{JSON.stringify(readRecently, null, 2)}</pre>
    </div>
  );
}

export default ReadRecently;
