import { connect } from "react-redux";

var firebase = require("firebase/app");

require("firebase/storage");
require("firebase/auth");

const createFirebase = () => {
  if (firebase.apps.length === 0) {
    // TODO: Replace the following with your app's Firebase project configuration
    var firebaseConfig = {
      apiKey: "AIzaSyAPHC0Q6m94eH28hDmL1Rdx4fOTs4ei5So",
      authDomain: "stba-portalapp.firebaseapp.com",
      databaseURL: "https://stba-portalapp.firebaseio.com",
      projectId: "stba-portalapp",
      storageBucket: "stba-portalapp.appspot.com",
      messagingSenderId: "178734720350",
      appId: "1:178734720350:web:59f43e2dda92b305df5bcf",
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
  firebase.auth().onAuthStateChanged(function (user) {
    console.log("auth state changed");
    console.log(user);
    if (user) {
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;

      // reflect values on backend server
      //console.log(user);
    } else {
      console.log("User is not signed in");
    }
  });

  return firebase;
};
export default createFirebase;
