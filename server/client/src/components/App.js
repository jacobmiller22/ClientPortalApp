import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import "../css/App.css";

import Header from "./Header";
import Landing from "./Landing";
import Uploader from "./Documents/Uploader";
import DocumentManager from "./Documents/DocumentManager";
import LoginPage from "./LoginPage";
import UserManager from "./Users/UserManager";

class App extends Component {
  componentDidMount() {
    this.props.__changeAuthState__();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="container">
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/upload" component={Uploader} />
            <Route exact path="/history" component={DocumentManager} />
            <Route exact path="/auth" component={LoginPage} />
            <Route exact path="/manage_users" component={UserManager} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
