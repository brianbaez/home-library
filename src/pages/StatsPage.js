import React from "react";
import useAuth from "../components/hooks/useAuth";

function StatsPage() {
  const isAuth = useAuth({path: "my-stats"});

  if(isAuth) {
    return (
      <div>
      </div>
    );
  }
}

export default StatsPage;
