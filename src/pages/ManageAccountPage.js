import React from "react";
import {useOutletContext} from "react-router-dom";

// Components
import ManageAccount from "../components/account/ManageAccount";

// Hooks
import useAuth from "../components/hooks/useAuth";

function ManageAccountPage() {
  const config = useOutletContext();
  const isAuth = useAuth({config});

  if(isAuth) {
    return (
      <div className="ManageAccountPage">
        <ManageAccount config={config}/>
      </div>
    );
  }
}

export default ManageAccountPage;
