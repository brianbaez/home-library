import React, {useState, useEffect} from "react";
import axios from "axios";

const useAuth = (props) => {
  const [isAuth, setIsAuth] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const authHandler = async (e) => {

      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`
        }
      };

      try {
        const {data} = await axios.get(`/api/private/${props.path}`, config);

        setIsAuth(true);
        setData(data);
      }
      catch(error) {
        localStorage.removeItem("authToken");

        setIsAuth(false);
        setData([]);
      }
    };

    authHandler();
  }, []);

  return {isAuth, data};
}

export default useAuth;
