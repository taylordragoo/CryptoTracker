import React, { Component } from "react";

import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";

import Home from "./Home/Home";
import Today from "./Today/Today";
import History from "./History/History";

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <h1>CryptoTracker</h1>
          <ul className="header">
            <li><NavLink exact to="/">Home</NavLink></li>
            <li><NavLink to="/today">Coins</NavLink></li>
            <li><NavLink to="/history">History</NavLink></li>
          </ul>
          <div className="content">
            <Route exact path="/" component={Home}/>
            <Route path="/today" component={Today}/>
            <Route path="/history" component={History}/>
          </div>
        </div>
      </HashRouter>
    );
  }
}
 
export default App;