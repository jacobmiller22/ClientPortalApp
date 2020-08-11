const requireLogin = require("../middlewares/requireLogin");
const { ADMINISTRATOR, CLIENT } = require("./userTypes");
require("./userTypes");

module.exports = (app) => {
  // Grant Role
  app.post("/api/grant_role", requireLogin, async (req, res) => {
    let uid = req.decodedToken.uid;

    let admin = require("../services/firebaseAdmin").createFireBaseAdmin();

    // TODO: Check if user is valid
    const user = await admin.auth().getUser(req.body.user.uid);
    var flagSuccess = false;
    const role = req.body.role;

    switch (req.body.role) {
      case ADMINISTRATOR:
        if (user.customClaims && user.customClaims.administrator === true) {
          console.log("USER IS ALREADY AN ADMIN");
          flagSuccess = true;
          break;
        }
        console.log("Setting to admin status");
        admin
          .auth()
          .setCustomUserClaims(user.uid, {
            administrator: true,
          })
          .then(() => {
            flagSuccess = true;
          });
        break;
      case CLIENT:
        if (user.customClaims && user.customClaims.administrator === false) {
          console.log("USER IS ALREADY A CLIENT");
          flagSuccess = true;
          break;
        }
        console.log("Setting to client status");
        admin
          .auth()
          .setCustomUserClaims(user.uid, {
            administrator: false,
          })
          .then(() => {
            flagSuccess = true;
          });
        break;
      default:
        console.log("Error: Invalid Role");
    }

    res.send(flagSuccess);
  });

  // Create user
  app.post("/api/create_user", requireLogin, async (req, res) => {
    console.log(req);
    console.log(req.user);
    console.log(req.body);

    let admin = require("../services/firebaseAdmin").createFireBaseAdmin();

    await admin
      .auth()
      .createUser(req.body.user)
      .then(function (userRecord) {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log("Successfully created new user:", userRecord.uid);
        res.send(userRecord);
      })
      .catch(function (error) {
        console.log("Error creating new user:", error);
      });
  });
};
