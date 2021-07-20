const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionHistorySchema = new Schema({
  createAt: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "products",
  },
  quantity: {
    type: Integer,
  },
});

module.exports = mongoose.model("history", TransactionHistorySchema);
