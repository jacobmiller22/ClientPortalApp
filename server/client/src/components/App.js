import React from "react";
import { Router, Route } from "react-router-dom";

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

import history from "../history";
import Profile from "./Auth/Profile";

const App = () => {
  return (
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <Header />
        <Route exact path='/' component={Landing} />
        <Route exact path='/documents/upload' component={Uploader} />
        <Route exact path='/documents' component={DocumentManager} />
        <Route exact path='/auth' component={SignIn} />
        <Route exact path='/users' component={UserManager} />
        <Route exact path='/auth/profile' component={Profile} />
        <Footer />
      </ThemeProvider>
    </Router>
  );
};

export default App;
