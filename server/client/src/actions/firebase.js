import { connect } from "react-redux";
import axios from "axios";
var firebase = require("firebase/app");
require("firebase/storage");
require("firebase/auth");

const createFirebase = () => {
  if (firebase.apps.length === 0) {
    console.log("reinitializing firebase");

    // TODO: Replace the following with your app's Firebase project configuration
    let firebaseConfig = {
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

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  }
  firebase.auth().onAuthStateChanged(function (user) {
    console.log("auth state changed");

    if (user) {
      let displayName = user.displayName;
      let email = user.email;
      let emailVerified = user.emailVerified;
      let photoURL = user.photoURL;
      let isAnonymous = user.isAnonymous;
      let uid = user.uid;
      let providerData = user.providerData;

      firebase
        .auth()
        .currentUser.getIdToken(true)
        .then(async function (idToken) {
          // Send token
          const res = await axios.post("/api/verify_token", { idToken });
        })
        .catch(function (error) {
          console.log(error);
        });

      // reflect values on backend server
      //console.log(user);
    } else {
      console.log("User is not signed in");
    }
  });

  return firebase;
};
export default createFirebase;
