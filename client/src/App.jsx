import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ProductContextProvider from "./contexts/ProductContext";
import CartContextProvider from "./contexts/CartContext";

import Home from "./views/Home";
import Shop from "./views/Shop";
import Cart from "./views/Cart";

function App() {
  return (
    <ProductContextProvider>
      <CartContextProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/shop" component={Shop} />
            <Route exact path="/cart" component={Cart} />
          </Switch>
        </Router>
      </CartContextProvider>
    </ProductContextProvider>
  );
}

export default App;
