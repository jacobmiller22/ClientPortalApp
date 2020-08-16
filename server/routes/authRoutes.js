// const requireLogin = require("../middlewares/requireLogin");
// const { ADMINISTRATOR, CLIENT } = require("./userTypes");
// require("./userTypes");

// module.exports = (app) => {
//   app.get("/api/users", requireLogin, async (req, res) => {
//     let uid = req.decodedToken.uid;

//     let admin = require("../services/firebaseAdmin").createFireBaseAdmin();

//     admin
//       .auth()
//       .listUsers()
//       .then((result) => {
//         try {
//           const users = JSON.stringify(result);
//           res.send(users);
//         } catch (error) {
//           console.log(error);
//         }
//       });
//   });
// };
