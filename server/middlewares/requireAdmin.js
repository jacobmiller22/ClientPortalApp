module.exports = async (req, res, next) => {
  try {
    const admin = require("../services/firebaseAdmin.js").createFireBaseAdmin();

    console.log(req.headers.idtoken);

    await admin
      .auth()
      .verifyIdToken(req.headers.idtoken)
      .then(async function (decodedToken) {
        // Verify admin
        if (decodedToken.administrator) {
          req.authorizedBy = decodedToken;
          next();
        }
        throw "Request made by unauthorized user";

        //
      });
  } catch (err) {
    console.log(err);
    return res.status(401).send({ error: err });
  }
};
