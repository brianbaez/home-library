import React, {useState, useEffect} from "react";
import axios from "axios";

function CurrentlyReading({config}) {
  const [currentlyReading, setCurrentlyReading] = useState("");
  const [error, setError] = useState("")

  useEffect(() => {
    console.log("Rendering CurrentlyReading...");

    const fetchCurrentlyReading = async () => {
      await axios.get(`/api/private/bookshelves/currently-reading`, config)
      .then((res) => {
        setCurrentlyReading(res.data.data)
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
    }

    fetchCurrentlyReading();
  }, []);

  return (
    <div className="col mb-3">
      <h4>Curently Reading</h4>
      <pre>{JSON.stringify(currentlyReading, null, 2)}</pre>
      {error && <span className="error-message">{error}</span>}
    </div>
  );
}

export default CurrentlyReading;
