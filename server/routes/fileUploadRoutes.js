const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const File = mongoose.model("files");

var multer = require("multer");

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
        .auth()
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

      //const files = await File.find({ uploadAuthor: req.user.id });
    });
  requireLogin,
    app.post(
      "/api/files",

      upload.single("file1"), // change file1 name to a dynamic
      (req, res) => {
        const admin = require("../services/firebaseAdmin.js").createFireBaseAdmin();

        async function uploadFiles() {
          let path = req.body.author + "/" + req.file.path;
          await admin
            .storage()
            .bucket()
            .upload(req.file.path, {
              destination: `${req.body.author}/${req.file.filename}`,
            });

          const { originalname, size, mimetype, filename } = req.file;

          const file = new File({
            originalname,
            size,
            mimetype,
            filename,
            uploadAuthor: req.body.author,
            dateUploaded: Date.now(),
          });

          try {
            await file.save();
            res.send(file);
          } catch (err) {
            res.status(422).send(err);
          }

          // Delete files off local server
        }
        uploadFiles().catch(console.error);
      }
    );
};
