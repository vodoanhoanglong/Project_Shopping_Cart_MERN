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
  cart: {
    type: Object,
  },
});

module.exports = mongoose.model("orders", OrderSchema);
