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

    // create user with firebase
    console.log(newUser);

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
        return res.status(401).send({ error: err });
      });
  });

  app.patch("/api/users", requireAdmin, async (req, res) => {
    // update user settings

    const uid = req.body.uid;

    admin
      .auth()
      .getUser(uid)
      .then((userRecord) => {
        const userInfo = {
          email:
            typeof req.body.email === undefined
              ? userRecord.email
              : req.body.email,
          password:
            typeof req.body.password === undefined
              ? userRecord.password
              : req.body.password,
          emailVerified: false,
          disabled: false,
        };

        // Update user with settings
        admin
          .auth()
          .updateUser(uid, userInfo)
          .then((userRecord) => {
            console.log("Updated user", userRecord.toJSON());
          })
          .catch((err) => {
            console.log(err);
            // TODO: change to correct status code
            return res.status(401).send({ error: err });
          });
      })
      .catch((err) => {
        console.log(`Error retrieving user: ${uid}.`, err);
        return res.status(401).send({ error: err });
      });
  });

  app.delete("/api.users", requireAdmin, async (req, res) => {
    const uid = req.body.uid;

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
  });
};
