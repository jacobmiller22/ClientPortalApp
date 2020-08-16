module.exports = async (req, res, next) => {
  try {
    const admin = require("../services/firebaseAdmin.js").createFireBaseAdmin();

    await admin
      .auth()
      .verifyIdToken(req.query.idToken)
      .then(async function (decodedToken) {
        req.decodedToken = decodedToken;
      });
  } catch (err) {
    console.log(err);
    return res.status(401).send({ error: "You must log in!" });
  }

  next();
};
