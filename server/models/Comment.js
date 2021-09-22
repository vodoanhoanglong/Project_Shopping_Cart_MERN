const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "products",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  content: String,
  feedback: [
    {
      user: { type: Schema.Types.ObjectId, ref: "users" },
      content: String,
    },
  ],
});

module.exports = mongoose.model("comments", CommentSchema);
