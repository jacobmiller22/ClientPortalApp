const mongoose = require("mongoose");
const { Schema } = mongoose;

const fileSchema = new Schema({
  originalname: String,
  size: Number,
  mimetype: String,
  filename: String,
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  dateUploaded: Date,
});

mongoose.model("files", fileSchema);
