const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RatingSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "products",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  rating: Number,
});

module.exports = mongoose.model("ratings", RatingSchema);
