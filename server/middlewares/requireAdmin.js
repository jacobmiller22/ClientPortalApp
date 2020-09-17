module.exports = async (req, res, next) => {
  const admin = require("../services/firebaseAdmin.js").createFireBaseAdmin();
  console.log("Verifying user");

  admin
    .auth()
    .verifyIdToken(req.headers.idtoken)
    .then(async function (decodedToken) {
      // Verify admin
      if (decodedToken.administrator) {
        req.sender = decodedToken;
        next();
      } else {
        throw "Request madee by unauthorized user";
      }
    })
    .catch((error) => {
      console.log(error);
      return res.status(401).send({ error });
    });
};
