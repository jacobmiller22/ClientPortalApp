const adminAuth = require("../services/firebaseAdmin").auth();

module.exports = (app) => {
  app.get("/api/current_user_firebase", (req, res) => {
    res.send(req);
    console.log(req);
    console.log(res);
  });
};
