module.exports = (app) => {
  app.post("/api/verify_token", (req, res) => {
    console.log("______________________________");
    console.log(req.body);
    console.log("______________________________");

    // Verify jwt token
    let admin = require("../services/firebaseAdmin").createFireBaseAdmin(); //.auth();

    // admin
    //   .auth()
    //   .verifyIdToken(req.body.idToken)
    //   .then(function (decodedToken) {
    //     let uid = decodedToken.uid;
    //     console.log("uid: " + uid);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  });
};
