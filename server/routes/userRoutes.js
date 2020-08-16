const requireLogin = require("../middlewares/requireLogin");


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
};
