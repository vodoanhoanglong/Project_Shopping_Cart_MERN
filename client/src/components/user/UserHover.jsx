import React from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";

import "../../css/UserHover.css";

const UserHover = () => {
  const {
    authState: { isAuthenticated, user },
  } = React.useContext(AuthContext);

  return (
    <div className="tooltip-user">
      {!isAuthenticated ? (
        <h5>
          <Link to="/login">Login / Register</Link>
        </h5>
      ) : (
        <>
          <h5> {user.username.split("@")[0]} </h5>
          <div className="user-choice">
            <p className="profile">My Profile</p>
            <p className="order">My Order</p>
            <p className="coupon-code">My Coupon Code</p>
          </div>
          <div className="logout-choice">
            <p>Log Out</p>
          </div>
        </>
      )}
    </div>
  );
};

export default UserHover;
