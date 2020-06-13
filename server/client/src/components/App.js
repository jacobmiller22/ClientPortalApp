import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import "../css/App.css";

import Header from "./Header";
import Landing from "./Landing";
import Uploader from "./files/Uploader";
import HistoryDashboard from "./files/fileHistory/HistoryDashboard";
import LoginPage from "./LoginPage";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchUserFirebase();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div className='container'>
            <Header />
            <Route exact path='/' component={Landing} />
            <Route exact path='/upload' component={Uploader} />
            <Route exact path='/history' component={HistoryDashboard} />
            <Route exact path='/auth' component={LoginPage} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
