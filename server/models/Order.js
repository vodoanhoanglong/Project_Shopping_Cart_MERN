const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  createAt: {
    type: String,
    default: new Date(Date.now()).toLocaleString(),
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  userInformation: Object,
  cart: Object,
  discount: Number,
  totalPrice: Number,
});

module.exports = mongoose.model("orders", OrderSchema);
