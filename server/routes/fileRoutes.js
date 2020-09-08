const requireLogin = require("../middlewares/requireLogin");
const requireAdmin = require("../middlewares/requireAdmin");
const uploadFiles = require("../middlewares/uploadFiles");
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
  app.post(
    "/api/files",
    requireLogin,
    upload.array("formData"),
    async (req, res) => {
      uploadFiles(req);
      console.log("-------------------------------------------");
      res.status(200).send();
    }
  );
};
