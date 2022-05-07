import React, {useState, useEffect} from "react";
import axios from "axios";

// Components
import ReadRecentlyBooks from "./ReadRecentlyBooks";

function ReadRecently({config}) {
  const [readRecently, setReadRecently] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const fetchReadRecently = async () => {
      await axios.get(`/api/private/bookshelves/books/read`, config)
      .then((res) => {
        setReadRecently(res.data.data[0].books)
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
    }

    fetchReadRecently();
  }, []);

  return (
    <div className="ReadRecently col mb-3">
      <h4>Read Recently</h4>
      <div className="ReadRecentlyContent shadow-sm border p-3">
        {!readRecently
          ? <span>{error}</span>
          : <ReadRecentlyBooks readRecently={readRecently}/>
        }
      </div>
    </div>
  );
}

export default ReadRecently;