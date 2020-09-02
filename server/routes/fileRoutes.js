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
  requireLogin,
    app.get("/api/files", async (req, res) => {
      const admin = require("../services/firebaseAdmin.js").createFireBaseAdmin();
      admin
        .storage()
        .bucket()
        .admin.auth()
        .verifyIdToken(req.query.currentUserToken)
        .then(async function (decodedToken) {
          console.log(decodedToken);
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

  requireLogin,
    app.post("/api/files", upload.array("formData"), (req, res) => {
      var adminSDK = require("../services/firebaseAdmin.js").createFireBaseAdmin();

      // Upload Documents
      (() => {
        adminSDK
          .auth()
          .verifyIdToken(req.query.idToken)
          .then(async (decodedToken) => {
            for (let i = 0; i < req.files.length; i++) {
              const destination = `${decodedToken.uid}/${req.files[i].filename}`;
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
              console.log(req.files[i].filename);
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
          });

        // All is great
        res.status(200).send();
      })();
    });
};
