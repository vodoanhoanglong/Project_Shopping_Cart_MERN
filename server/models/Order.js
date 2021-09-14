const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  createAt: String,
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
