import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavbarMenu from "./components/layout/NavbarMenu";
import ProductContextProvider from "./contexts/ProductContext";

function App() {
  return (
    <ProductContextProvider>
      <Router>
        <Switch>
          <NavbarMenu />
        </Switch>
      </Router>
    </ProductContextProvider>
  );
}

export default App;
