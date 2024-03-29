import React, {useState, useEffect} from "react";
import axiosInstance from "../../../axios";

// Components
import ReadRecentlyBooks from "./ReadRecentlyBooks";

function ReadRecently({config}) {
  const [readRecently, setReadRecently] = useState();

  const [readRecentlyLoading, setReadRecentlyLoading] = useState(true);

  const [error, setError] = useState();

  useEffect(() => {
    // Get books in the read bookshelf
    const fetchReadRecently = async () => {
      await axiosInstance.get(`/api/private/bookshelves/books/read`, config)
      .then((res) => {
        setReadRecently(res.data.data[0].books);
        setReadRecentlyLoading(false);
      })
      .catch((error) => {
        setError(error.response.data.error);
        setReadRecentlyLoading(false);
      });
    }

    fetchReadRecently();
  }, []);

  if(!readRecentlyLoading) {
    return (
      <div className="ReadRecently col mb-5 mb-lg-3">
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
}

export default ReadRecently;
