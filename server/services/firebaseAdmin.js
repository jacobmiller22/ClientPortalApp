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

  //admin = admin.storage().bucket();

  return admin;
};

exports.findUser = function (uid) {
  const mongoose = require("mongoose");
  const User = mongoose.model("users");

  async (uid) => {
    const existingUser = await User.findOne({ uid: uid });

    if (existingUser) {
      // user exists
      return existingUser;
    }
    // make new user in backend
    const user = await new User({ uid }).save();
    return user;
  };
};
