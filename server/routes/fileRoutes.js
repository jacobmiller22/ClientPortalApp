const requireLogin = require("../middlewares/requireLogin");
var multer = require("multer");
const fs = require("fs");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./data/uploads");
  },
  filename: function (req, file, cb) {
    const fileExt = file.originalname.split(".")[1]; // TODO: Think of more cases
    const uniqueSuffix =
      "-" + Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.originalname.split(".")[0].replace(/\s/g, "") +
        uniqueSuffix +
        "." +
        fileExt
    );
  },
});
var upload = multer({
  storage: storage,
});

module.exports = (app) => {
  app.get("/api/files", requireLogin, async (req, res) => {
    const admin = require("../services/firebaseAdmin.js").createFireBaseAdmin();
    admin
      .storage()
      .bucket()
      .admin.auth()
      .verifyIdToken(req.query.currentUserToken)
      .then(async (decodedToken) => {
        let uid = decodedToken.uid;

        try {
          const files = await File.find({ uploadAuthor: uid });
          res.send(files);
        } catch (error) {
          console.log(error);
        }
      })
      .catch(function (error) {
        console.log("Error:");
        console.log(error);
      });
  });

  app.post(
    "/api/files",
    requireLogin,
    upload.array("formData"),
    async (req, res) => {
      const adminSDK = require("../services/firebaseAdmin.js").createFireBaseAdmin();

      // upload documents
      for (let i = 0; i < req.files.length; i++) {
        const { authorizedBy } = req;
        console.log("auth by", authorizedBy);
        const destination = `User-Documents/${authorizedBy.uid}/Client-Provided/${req.files[i].filename}`;
        await adminSDK
          .storage()
          .bucket()
          .upload(req.files[i].path, {
            destination,
          })
          .catch((err) => {
            // Evaluate error
            console.log(
              "There was an error while uploading documents to the google cloud storage bucket. See Error:\n",
              err
            );
            res.status(500).send();
          });

        // Delete files off local server
        fs.unlink(`./data/uploads/${req.files[i].filename}`, (err) => {
          if (err) {
            console.log(
              "There was an error while deleting files off the local server.\n",
              err
            );
          }
        });
      }
      res.status(200).send();
    }
  );
};
