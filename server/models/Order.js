const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  createAt: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  cart: Object,
  discount: Number,
  totalPrice: Number,
});

module.exports = mongoose.model("orders", OrderSchema);
