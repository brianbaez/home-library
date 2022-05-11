import React, {useState, useEffect} from "react";
import axios from "axios";

// Components
import WantToReadBooks from "./WantToReadBooks";

function WantToRead({config}) {
  const [wantToRead, setWantToRead] = useState();

  const [wantToReadLoading, setWantToReadLoading] = useState(true);

  const [error, setError] = useState();

  useEffect(() => {
    // Get books in the want-to-read bookshelf
    const fetchWantToRead = async () => {
      await axios.get(`/api/private/bookshelves/books/want-to-read`, config)
      .then((res) => {
        setWantToRead(res.data.data[0].books);
        setWantToReadLoading(false);
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
    }

    fetchWantToRead();
  }, []);

  if(!wantToReadLoading) {
    return (
      <div className="WantToRead col mb-5 mb-lg-3">
        <h4>Want to Read</h4>
        <div className="WantToReadContent shadow-sm border p-3">
          {!wantToRead
            ? <span>{error}</span>
            : <WantToReadBooks wantToRead={wantToRead}/>
          }
        </div>
      </div>
    );
  }
}

export default WantToRead;
