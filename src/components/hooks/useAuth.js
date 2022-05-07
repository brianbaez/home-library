import React, {useState, useEffect} from "react";
import axios from "axios";

function useAuth({config}) {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const authHandler = async (e) => {
      try {
        const {data} = await axios.get(`/api/private/user`, config);
        setIsAuth(true);
      }
      catch(error) {
        localStorage.removeItem("authToken");
        setIsAuth(false);
      }
    };

    authHandler();
  }, []);

  return isAuth;
}

export default useAuth;
