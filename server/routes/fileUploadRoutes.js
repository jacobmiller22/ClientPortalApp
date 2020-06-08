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
  app.get("/api/files", (req, res) => {
    res.send(req);
  });

  app.post(
    "/api/files",
    requireLogin,
    upload.single("file1"), // change file1 name to a dynamic
    (req, res) => {
      const bucket = require("../services/firebaseAdmin.js").createFireBaseAdmin();

      async function uploadFiles() {
        await bucket.upload(req.file.path);

        console.log("Josh is feckin ghey");

        const { originalname, size, mimetype, filename } = req.file;

        const file = new File({
          originalname,
          size,
          mimetype,
          filename,
        });

        try {
          await file.save();
          res.send(file);
        } catch (err) {
          res.status(422).send(err);
        }
      }
      uploadFiles().catch(console.error);
    }
  );
};
