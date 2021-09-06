import React from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";

const UserHover = () => {
  const {
    authState: { isAuthenticated, user },
  } = React.useContext(AuthContext);

  return (
    <div>
      {!isAuthenticated ? (
        <h5>
          <Link to="/login">Login / SignIn</Link>
        </h5>
      ) : (
        <h5> {user.username.split("@")[0]} </h5>
      )}
    </div>
  );
};

export default UserHover;
