import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import { registerAuthListener } from "../actions";

import "../components/styling/App.css";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "./styling/themes";

import Header from "./Header";
import Landing from "./Landing";
import Uploader from "./Documents/Uploader";
import DocumentManager from "./Documents/DocumentManager";
import UserManager from "./Users/UserManager";
import SignIn from "./Forms/Authentication/SignIn";
import Footer from "./Footer";

class App extends Component {
  componentDidMount() {
    this.props.registerAuthListener();
  }

  render() {
    return (
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Header />
          <Route exact path='/' component={Landing} />
          <Route exact path='/documents/upload' component={Uploader} />
          <Route exact path='/documents' component={DocumentManager} />
          <Route exact path='/auth' component={SignIn} />
          <Route exact path='/users' component={UserManager} />
          <Footer />
        </ThemeProvider>
      </BrowserRouter>
    );
  }
}

export default connect(null, { registerAuthListener })(App);
