module.exports = async (req, res, next) => {
  const admin = require("../services/firebaseAdmin.js").createFireBaseAdmin();
  console.log(req.headers.idToken);
  admin
    .auth()
    .verifyIdToken(req.headers.idtoken)
    .then(async function (decodedToken) {
      req.authorizedBy = decodedToken;
      next();
    })
    .catch((error) => {
      console.log(error);
      return res.status(401).send({ error });
    });
};
