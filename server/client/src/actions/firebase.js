var firebase = require("firebase/app");

require("firebase/storage");

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
  return firebase;
};
export default createFirebase;
