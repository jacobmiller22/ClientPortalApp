const mongoose = require("mongoose");
const { Schema } = mongoose;

const fileSchema = new Schema({
  originalname: String,
  size: Number,
  mimetype: String,
  filename: String,
});

mongoose.model("files", fileSchema);
