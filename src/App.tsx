import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Bingo from "./pages/Bingo";
import About from "./pages/About";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/bingo">
            <Bingo />
          </Route>
          <Route path="*">Not Found</Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
