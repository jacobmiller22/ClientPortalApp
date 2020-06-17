module.exports = (req, res, next) => {
  console.log("REQUIRE LOGIN");
  console.log(req);
  if (!req.user) {
    return res.status(401).send({ error: "You must log in!" });
  }

  next();
};
