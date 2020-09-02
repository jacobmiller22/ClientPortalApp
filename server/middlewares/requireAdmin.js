module.exports = async (req, res, next) => {
  const admin = require("../services/firebaseAdmin.js").createFireBaseAdmin();

  admin
    .auth()
    .verifyIdToken(req.headers.idtoken)
    .then(async function (decodedToken) {
      // Verify admin
      if (decodedToken.administrator) {
        req.authorizedBy = decodedToken;
        next();
      }
      throw "Request made by unauthorized user";
    })
    .catch((error) => {
      console.log(error);
      return res.status(401).send({ error });
    });
};
