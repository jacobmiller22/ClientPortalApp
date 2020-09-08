const fs = require("fs");

module.exports = async (req, res, next) => {
  const adminSDK = require("../services/firebaseAdmin.js").createFireBaseAdmin();

  const sender = JSON.parse(req.query.sender);
  const reciever = JSON.parse(req.query.reciever);
  const provider =
    reciever.uid === sender.uid ? "Client-Provided" : "Business-Provided";
  // upload documents
  for (let i = 0; i < req.files.length; i++) {
    const destination = `User-Documents/${reciever.uid}/${provider}/${req.files[i].filename}`;

    // TODO: add file metadata for who uploaded a file

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
    console.log("Deleting files off local server");
    fs.unlink(`./data/uploads/${req.files[i].filename}`, (err) => {
      if (err) {
        console.log(
          "There was an error while deleting files off the local server.\n",
          err
        );
        res.status(500).send();
      }
    });
  }
};
