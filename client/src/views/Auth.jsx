import { useContext } from "react";
import { Redirect, useLocation } from "react-router-dom";

import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import { AuthContext } from "../contexts/AuthContext";

import "../css/Auth.css";

const Auth = ({ authRoute }) => {
  const {
    authState: { isAuthenticated },
  } = useContext(AuthContext);

  let body;

  const location = useLocation();
  let currentLocation;
  try {
    currentLocation = location.state.referrer;
  } catch (error) {}

  if (isAuthenticated && currentLocation === "/user")
    return <Redirect to="/user" />;
  if (isAuthenticated && currentLocation === "/cart")
    return <Redirect to="/cart" />;
  if (isAuthenticated) return <Redirect to="/" />;
  else
    body = (
      <>
        {authRoute === "login" && <LoginForm />}
        {authRoute === "register" && <RegisterForm />}
      </>
    );
  return (
    <div className="animate__animated animate__fadeIn">
      <div className="landing">
        <div className="dark-overlay">
          <h1>Dragon's Store</h1>
          {!currentLocation ? (
            <h4>Reasonable place to shop</h4>
          ) : (
            <h4>Please login to continues</h4>
          )}
          {body}
        </div>
      </div>
    </div>
  );
};

export default Auth;
