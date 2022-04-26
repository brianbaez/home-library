import React, {useState, useEffect} from "react";
import axios from "axios";

function Challenges({config}) {
  const [challenges, setChallenges] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    console.log("Rendering Challenges...");

    const fetchChallenges = async () => {
      const year = new Date().getFullYear();

      await axios.get(`/api/private/challenges/${year}`, config)
      .then((res) => {
        setChallenges(res.data.data);
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
    }

    fetchChallenges();
  }, []);

  return (
    <div className="col mb-3">
      <h4>2022 Reading Challenge</h4>
      {error && <span className="error-message">{error}</span>}
      <pre>{JSON.stringify(challenges, null, 2)}</pre>
    </div>
  );
}

export default Challenges;
