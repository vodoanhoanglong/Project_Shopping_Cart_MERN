import React from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";
import { UserContext } from "../../contexts/UserContext";

import "../../css/UserHover.css";

const UserHover = () => {
  const {
    authState: { isAuthenticated, user },
  } = React.useContext(AuthContext);

  const { setChoice } = React.useContext(UserContext);

  const handleClick = (type) => (e) => setChoice(type);

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
            <Link
              to="/user"
              className="profile"
              onClick={handleClick("profile")}
            >
              <p>My Profile</p>
            </Link>
            <Link to="/user" className="order" onClick={handleClick("order")}>
              <p>My Order</p>
            </Link>
            <Link
              to="/user"
              className="coupon-code"
              onClick={handleClick("coupon")}
            >
              <p>My Coupon Code</p>
            </Link>
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
