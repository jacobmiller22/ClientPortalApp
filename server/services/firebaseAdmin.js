exports.createFireBaseAdmin = function () {
  var admin = require("firebase-admin");

  if (admin.apps.length === 0) {
    var serviceAccount = require("../config/stba-portalapp-firebase-adminsdk-uzwc3-e09d13072b.json");

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: "stba-portalapp.appspot.com",
    });
    console.log("App initialized");
  }

  var admin = admin.storage().bucket();

  return admin;
};
