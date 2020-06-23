const requireLogin = require("../middlewares/requireLogin");

module.exports = (app) => {
  app.get("/api/users", requireLogin, async (req, res) => {
    let uid = req.decodedToken.uid;

    let admin = require("../services/firebaseAdmin").createFireBaseAdmin();

    admin
      .auth()
      .listUsers()
      .then((result) => {
        try {
          const users = JSON.stringify(result);
          res.send(users);
        } catch (error) {
          console.log(error);
        }
      });
  });

  app.post("/api/grant_role", requireLogin, async (req, res) => {
    let uid = req.decodedToken.uid;

    let admin = require("../services/firebaseAdmin").createFireBaseAdmin();

    // TODO: Check if user is valid
    const user = await admin.auth().getUser(req.body.user.uid);
    var flagSuccess = true;
    const role = req.body.role;
    if (role === "Administrator") {
      if (user.customClaims && user.customClaims.administrator === true) {
        console.log("USER IS ALREADY AN ADMIN");
      } else {
        console.log("Setting to admin status");
        admin.auth().setCustomUserClaims(user.uid, {
          administrator: true,
        });
      }
    } else if (role === "Client") {
      if (user.customClaims && user.customClaims.administrator === false) {
        console.log("USER IS ALREADY A CLIENT");
      } else {
        console.log("Setting to client status");
        admin.auth().setCustomUserClaims(user.uid, {
          administrator: false,
        });
      }
    } else {
      console.log("Invalid role");
      flagSuccess = false;
    }

    res.send(flagSuccess);
  });
};
