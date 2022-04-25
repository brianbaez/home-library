import React, {useState, useEffect} from "react";
import axios from "axios";
import useAuth from "../components/hooks/useAuth";

function HomePage() {
  const isAuth = useAuth({path: "home"});

  // Get user data to display on home page
  const [currentlyReading, setCurrentlyReading] = useState("");
  const [challenges, setChallenges] = useState("");
  const [readRecently, setReadRecently] = useState("");
  const [wantToRead, setWantToRead] = useState("");

  // Error
  const [error, setError] = useState("");

  useEffect(() => {
    if(isAuth) {
      console.log("Authenticated. Getting data...");

      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`
        }
      };

      const fetchCurrentlyReading = async () => {
        await axios.get(`/api/private/bookshelves/currently-reading`, config)
        .then((res) => {
          setCurrentlyReading(res.data.data)
        })
        .catch((error) => {
          setError(error.response.data.error);
        });
      }

      const fetchChallenges = async () => {
        const year = new Date().getFullYear();

        await axios.get(`/api/private/challenges/${year}`, config)
        .then((res) => {
          setChallenges(res.data.data[0]);
        })
        .catch((error) => {
          setError(error.response.data.error);
        });
      }

      const fetchReadRecently = async () => {
        await axios.get(`/api/private/bookshelves/read`, config)
        .then((res) => {
          setReadRecently(res.data.data)
        })
        .catch((error) => {
          setError(error.response.data.error);
        });
      }

      const fetchWantToRead = async () => {
        await axios.get(`/api/private/bookshelves/want-to-read`, config)
        .then((res) => {
          setWantToRead(res.data.data)
        })
        .catch((error) => {
          setError(error.response.data.error);
        });
      }

      fetchCurrentlyReading();
      fetchChallenges();
      fetchReadRecently();
      fetchWantToRead();
    }
  }, [isAuth]);

  if(isAuth) {
    return (
      <div className="Home">
        <div className="container home-content mt-3 mb-3">
          <div className="row row-cols-1 row-cols-lg-2">
            <div className="col mb-3">
              <h4>Curently Reading</h4>
              <pre>{JSON.stringify(currentlyReading, null, 2)}</pre>
              {error && <span className="error-message">{error}</span>}
            </div>

            <div className="col mb-3">
              <h4>2022 Reading Challenge</h4>
              {error && <span className="error-message">{error}</span>}
              <pre>{JSON.stringify(challenges, null, 2)}</pre>
            </div>

            <div className="col mb-3">
              <h4>Read Recently</h4>
              <pre>{JSON.stringify(readRecently, null, 2)}</pre>
              {error && <span className="error-message">{error}</span>}
            </div>

            <div className="col mb-3">
              <h4>Want to Read</h4>
              <pre>{JSON.stringify(wantToRead, null, 2)}</pre>
              {error && <span className="error-message">{error}</span>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
