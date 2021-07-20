const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  url: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  quantity: {
    type: Integer,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});
module.exports = mongoose.model("products", ProductSchema);
