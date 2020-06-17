import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import App from "./components/App";
import reducers from "./reducers";

import { ReactReduxFirebaseProvider } from "react-redux-firebase";

// firebase config object
const fbConfig = {
  apiKey: "AIzaSyAPHC0Q6m94eH28hDmL1Rdx4fOTs4ei5So",
  authDomain: "stba-portalapp.firebaseapp.com",
  databaseURL: "https://stba-portalapp.firebaseio.com",
  projectId: "stba-portalapp",
  storageBucket: "stba-portalapp.appspot.com",
  messagingSenderId: "178734720350",
  appId: "1:178734720350:web:59f43e2dda92b305df5bcf",
};
console.log(fbConfig);
// react-redux-firebase config
const rrfConfig = {
  //userProfile: "users",
};

// Initialize firebase

firebase.initializeApp(fbConfig);

// Init other firebase services

// add firebase to reducers

const store = createStore(reducers, applyMiddleware(reduxThunk));

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
};

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.querySelector("#root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
