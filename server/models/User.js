const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,

  createAt: {
    type: Date,
    default: Date.now(),
  },
  fullName: String,
  phone: String,
  address: String,
  gender: String,
  dateOfBirth: Date,
  couponCode: String,
});

module.exports = mongoose.model("users", UserSchema);
