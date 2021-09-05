import { Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const {
    authState: { isAuthenticated },
  } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { referrer: "/cart" },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
