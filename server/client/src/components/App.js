import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import { __changeAuthState__ } from "../actions";

import "../components/styling/App.css";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "./styling/themes";

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
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Header />
          <Route exact path="/" component={Landing} />
          <Route exact path="/upload" component={Uploader} />
          <Route exact path="/history" component={DocumentManager} />
          <Route exact path="/auth" component={LoginPage} />
          <Route exact path="/manage_users" component={UserManager} />
        </ThemeProvider>
      </BrowserRouter>
    );
  }
}

export default connect(null, { __changeAuthState__ })(App);
