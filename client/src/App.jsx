import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AuthContextProvider from "./contexts/AuthContext";
import UserContextProvider from "./contexts/UserContext";
import ProductContextProvider from "./contexts/ProductContext";
import CartContextProvider from "./contexts/CartContext";
import FavoritesContextProvider from "./contexts/FavoritesContext";
import RatingContextProvider from "./contexts/RatingContext";
import ProtectedRoute from "./components/routing/ProtectedRoute";

import Home from "./views/Home";
import Shop from "./views/Shop";
import Cart from "./views/Cart";
import Auth from "./views/Auth";
import User from "./views/User";

function App() {
  return (
    <AuthContextProvider>
      <ProductContextProvider>
        <UserContextProvider>
          <CartContextProvider>
            <FavoritesContextProvider>
              <RatingContextProvider>
                <Router>
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/shop" component={Shop} />
                    <Route
                      exact
                      path="/login"
                      render={(props) => <Auth {...props} authRoute="login" />}
                    />
                    <Route
                      exact
                      path="/register"
                      render={(props) => (
                        <Auth {...props} authRoute="register" />
                      )}
                    />
                    <ProtectedRoute exact path="/user" component={User} />
                    <ProtectedRoute exact path="/cart" component={Cart} />
                  </Switch>
                </Router>
              </RatingContextProvider>
            </FavoritesContextProvider>
          </CartContextProvider>
        </UserContextProvider>
      </ProductContextProvider>
    </AuthContextProvider>
  );
}

export default App;
