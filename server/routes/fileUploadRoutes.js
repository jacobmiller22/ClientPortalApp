const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const File = mongoose.model("files");

var multer = require("multer");
var upload = multer({ dest: "./data/uploads/" });

module.exports = (app) => {
  console.log("routes called!");

  app.get("/api/files", (req, res) => {
    res.send(req);
  });

  app.post(
    "/api/files",
    requireLogin,
    upload.single("file1"), // change file1 name to a dynamic
    async (req, res) => {
      const { originalname, size, mimetype } = req.file;

      const file = new File({
        originalname,
        size,
        mimetype,
      });

      try {
        await file.save();
        res.send(file);
      } catch (err) {
        res.status(422).send(err);
      }
    }
  );
};
