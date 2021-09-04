import { useContext } from "react";
import { Redirect } from "react-router-dom";

import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import { AuthContext } from "../contexts/AuthContext";

import "../css/Auth.css";

const Auth = ({ authRoute }) => {
  const {
    authState: { isAuthenticated },
  } = useContext(AuthContext);

  let body;

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
          <h4>Reasonable place to shop</h4>
          {body}
        </div>
      </div>
    </div>
  );
};

export default Auth;
