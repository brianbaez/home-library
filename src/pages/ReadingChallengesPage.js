import React, {useState, useEffect} from "react";
import axios from "axios";
import useAuth from "../components/hooks/useAuth";

function ReadingChallengesPage() {
  const isAuth = useAuth({path: "my-reading-challenges"});

  const [challenges, setChallenges] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    console.log("Rendering Challenges...");

    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("authToken")}`
      }
    };

    const fetchChallenges = async () => {
      await axios.get(`/api/private/challenges/`, config)
      .then((res) => {
        setChallenges(res.data.data);
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
    }

    fetchChallenges();
  }, []);

  if(isAuth) {
    return (
      <div className="Challenges">
        <div className="container challenges-content mt-3 mb-3">
          <h4>Reading Challenges</h4>
          {error && <span className="error-message">{error}</span>}
          <pre>{JSON.stringify(challenges, null, 2)}</pre>
        </div>
      </div>
    );
  }
}

export default ReadingChallengesPage;
