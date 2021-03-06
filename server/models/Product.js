const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  size: Array,
  url: [
    {
      color: String,
      img: Array,
    },
  ],
  price: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  discount: {
    type: Number,
    default: 0,
  },
});
module.exports = mongoose.model("products", ProductSchema);
