import React from "react";
import { UserContext } from "../contexts/UserContext";
import { AuthContext } from "../contexts/AuthContext";

import NavbarMenu from "../components/layout/NavbarMenu";
import Profile from "../components/user/Profile";
import Order from "../components/user/Order";
import Coupon from "../components/user/Coupon";

import "../css/User.css";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const User = () => {
  const { choice, setChoice } = React.useContext(UserContext);
  const { logoutUser } = React.useContext(AuthContext);

  const handleClick = (type) => (e) => setChoice(type);

  return (
    <div className="landing-user animate__animated animate__fadeIn">
      <NavbarMenu />
      <div className="dark-overlay-user">
        <div className="container-user">
          <div className="menu-list-user">
            <div
              className={choice === "profile" ? "focus-user" : null}
              onClick={handleClick("profile")}
            >
              <h2>My Profile</h2>
              <ArrowForwardIosIcon />
            </div>
            <div
              className={choice === "order" ? "focus-user" : null}
              onClick={handleClick("order")}
            >
              <h2>My Order</h2>
              <ArrowForwardIosIcon />
            </div>
            <div
              className={choice === "coupon" ? "focus-user" : null}
              onClick={handleClick("coupon")}
            >
              <h2>My Coupon</h2>
              <ArrowForwardIosIcon />
            </div>
            <div onClick={() => logoutUser()}>
              <h2>Logout</h2>
              <ExitToAppIcon />
            </div>
          </div>
          <div className="content-user">
            {choice === "profile" ? (
              <Profile />
            ) : choice === "order" ? (
              <Order />
            ) : choice === "coupon" ? (
              <Coupon />
            ) : (
              <Profile />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
