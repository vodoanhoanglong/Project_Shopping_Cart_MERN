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
  couponCode: [
    {
      name: { type: String, unique: true },
      status: { type: Boolean, default: false },
    },
  ],
});

module.exports = mongoose.model("users", UserSchema);
