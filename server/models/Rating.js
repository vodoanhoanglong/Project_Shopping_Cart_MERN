const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RatingSchema = new Schema({
  createAt: String,
  product: {
    type: Schema.Types.ObjectId,
    ref: "products",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  rating: Number,
  content: String,
});

module.exports = mongoose.model("ratings", RatingSchema);
