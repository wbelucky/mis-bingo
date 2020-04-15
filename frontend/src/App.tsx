import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect, useParams } from "react-router-dom";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Bingo from "./pages/Bingo";
import About from "./pages/About";
import Header from "./components/Header";
import Signup from "./pages/Signup";
import AUser from "./pages/AUser";

function App() {
  const auth = true; // TODO:
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/login">
            <div>
              <p>ログイン</p>
            </div>
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          {auth ? (
            <Route>
              <Header>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/about">
                  <About />
                </Route>
                <Route exact path="/users">
                  <Users />
                </Route>
                <Route path="/users/:id">
                  <AUser />
                </Route>
                <Route path="/bingo">
                  <Bingo />
                </Route>
              </Header>
            </Route>
          ) : (
            <Redirect to="/login" />
          )}
          <Route path="*">Not Found</Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
