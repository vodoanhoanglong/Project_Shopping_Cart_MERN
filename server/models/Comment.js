const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  createAt: String,
  product: {
    type: Schema.Types.ObjectId,
    ref: "products",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  content: String,
});

module.exports = mongoose.model("comments", CommentSchema);
