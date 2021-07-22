import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavbarMenu from "./components/layout/NavbarMenu";

function App() {
  return (
    <Router>
      <Switch>
        <NavbarMenu />
      </Switch>
    </Router>
  );
}

export default App;
