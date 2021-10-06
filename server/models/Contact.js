const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  createAt: {
    type: Date,
    default: Date.now(),
  },
  fullName: String,
  email: String,
  phone: String,
  message: String,
});

module.exports = mongoose.model("contacts", ContactSchema);
