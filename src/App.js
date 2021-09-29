import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import AUM from "./pages/AUM";
import Tokens from "./pages/Tokens";

function App() {
  return (
    <div
      style={{
        backgroundColor: "#181818",
        color: "white",
        display: "flex",
        flexDirection: "row",
        height: "100vh",
      }}
    >
      <Router>
        <Sidebar />
        <Switch>
          <Route path="/Home">
            <Home />
          </Route>
          <Route path="/AUM">
            <AUM />
          </Route>
          <Route path="/Tokens">
            <Tokens />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
