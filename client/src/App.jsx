import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductContextProvider from "./contexts/ProductContext";
import Home from "./views/Home";
import Shop from "./views/Shop";
import CartContextProvider from "./contexts/CartContext";

function App() {
  return (
    <ProductContextProvider>
      <CartContextProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/shop" component={Shop} />
          </Switch>
        </Router>
      </CartContextProvider>
    </ProductContextProvider>
  );
}

export default App;
