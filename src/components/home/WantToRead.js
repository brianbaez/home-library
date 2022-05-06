import React, {useState, useEffect} from "react";
import axios from "axios";

function WantToRead({config}) {
  const [wantToRead, setWantToRead] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    console.log("Rendering WantToRead...");

    const fetchWantToRead = async () => {
      await axios.get(`/api/private/bookshelves/books/want-to-read`, config)
      .then((res) => {
        setWantToRead(res.data.data)
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
    }

    fetchWantToRead();
  }, []);

  return (
    <div className="col mb-3">
      <h4>Want to Read</h4>
      {error && <span className="error-message">{error}</span>}
      <pre>{JSON.stringify(wantToRead, null, 2)}</pre>
    </div>
  );
}

export default WantToRead;