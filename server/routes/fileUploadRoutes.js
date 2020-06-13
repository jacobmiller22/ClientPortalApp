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
  app.get("/api/files", requireLogin, async (req, res) => {
    const files = await File.find({ _user: req.user.id });
    res.send(files);
  });

  app.post(
    "/api/files",
    requireLogin,
    upload.single("file1"), // change file1 name to a dynamic
    (req, res) => {
      const admin = require("../services/firebaseAdmin.js").createFireBaseAdmin();

      async function uploadFiles() {
        await admin.storage().bucket().upload(req.file.path);

        const { originalname, size, mimetype, filename } = req.file;

        const file = new File({
          originalname,
          size,
          mimetype,
          filename,
          _user: req.user.id,
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
