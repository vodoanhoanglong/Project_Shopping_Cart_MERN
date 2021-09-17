const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FavoritesSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "products",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = mongoose.model("favorites", FavoritesSchema);
