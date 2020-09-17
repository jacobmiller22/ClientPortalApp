const requireLogin = require("../middlewares/requireLogin");
const requireAdmin = require("../middlewares/requireAdmin");

module.exports = (app) => {
  app.get("/api/users", requireLogin, async (req, res) => {
    const admin = require("../services/firebaseAdmin").createFireBaseAdmin();

    admin
      .auth()
      .listUsers()
      .then((result) => {
        try {
          const users = JSON.stringify(result.users);
          res.send(users);
        } catch (error) {
          console.log(error);
        }
      });
  });

  app.post("/api/users", requireAdmin, async (req, res) => {
    const { email, password } = req.body;
    const newUser = { email, password };

    // Firebase needs email, password
    // optionally give:
    // displaName, phoneNumber, emailVerified
    const admin = require("../services/firebaseAdmin").createFireBaseAdmin();
    admin
      .auth()
      .createUser(newUser)
      .then((userRecord) => {
        console.log("New user created:", userRecord);
      })
      .catch((err) => {
        console.log(err);
        // TODO: change to correct status code
        res.status(401).send({ error: err });
      });
    res.status(200).send();
  });

  app.patch("/api/users", requireAdmin, async (req, res) => {
    // update user settings
    console.log("starting to update user");
    const admin = require("../services/firebaseAdmin").createFireBaseAdmin();

    const user = req.body.user;
    console.log(user);
    admin
      .auth()
      .getUser(user.uid)
      .then((userRecord) => {
        const userInfo = {
          displayName:
            typeof user.displayName === undefined
              ? userRecord.displayName
              : user.displayName,
          email:
            typeof user.email === undefined ? userRecord.email : user.email,
          password:
            typeof user.password === undefined
              ? userRecord.password
              : user.password,
          emailVerified:
            typeof user.emailVerified === undefined
              ? userRecord.emailVerified
              : user.emailVerified,
          disabled:
            typeof user.disabled === undefined
              ? userRecord.disabled
              : user.disabled,
        };

        // Update user with settings

        admin
          .auth()
          .updateUser(user.uid, userInfo)
          .then(() => {
            console.log("Updated user");
          })
          .catch((err) => {
            console.log(err);
            // TODO: change to correct status code
            return res.status(401).send({ error: err });
          });

        // Take care of custom claims

        const claims = user.customClaims;
        console.log(claims);
        admin
          .auth()
          .setCustomUserClaims(user.uid, {
            administrator: claims.administrator,
            organization: claims.organization,
          })
          .then(() => {
            console.log("Custom Claims set successfully ");
          })
          .catch((error) => {
            console.log("Error setting custom claims: ", error);
          });
      })
      .catch((err) => {
        console.log(`Error retrieving user: ${uid}.`, err);
        return res.status(401).send({ error: err });
      });

    res.status(200).send();
  });

  app.delete("/api/users", requireAdmin, async (req, res) => {
    const admin = require("../services/firebaseAdmin").createFireBaseAdmin();

    const uid = req.body.uid;
    console.log("Deleting user: ", req.body);

    admin
      .auth()
      .deleteUser(uid)
      .then(() => {
        console.log("Successfully deleted user:", uid);
      })
      .catch((error) => {
        console.log("Error deleting user:", error);
        // TODO: change to correct status code
        return res.status(401).send({ error: err });
      });
    res.status(200).send();
  });
};
