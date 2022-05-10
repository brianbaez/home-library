import React, {useState, useEffect} from "react";
import axios from "axios";

// Components
import AccountDetails from "./AccountDetails";
import Password from "./Password";
import DeleteAccount from "./DeleteAccount";

function ManageAccount({config}) {
  const [id, setID] = useState();
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();

  const [accountLoading, setAccountLoading] = useState(true);

  const accountDetailsProps = {config, email, setEmail, username, setUsername};

  useEffect(() => {
    const getUserData = async () => {
      await axios.get(`/api/private/account`, config)
      .then((res) => {
        setID(res.data.data.id);
        setEmail(res.data.data.email);
        setUsername(res.data.data.username);
        setAccountLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data.error);
      })
    }

    getUserData();
  }, []);

  if(!accountLoading) {
    return (
      <div className="ManageAccount container mt-3">
        <h4>Manage Account</h4>
        <div className="shadow-sm border px-3 py-3">
          <AccountDetails {...accountDetailsProps}/>
          <Password config={config }/>
          <DeleteAccount config={config}/>
        </div>
      </div>
    );
  }
}

export default ManageAccount;
