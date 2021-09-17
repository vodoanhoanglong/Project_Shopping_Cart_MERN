const Favorites = require("../models/favorites");
const Product = require("../models/product");

module.exports.getFavoritesList = async (req, res) => {
  try {
    const favoritesList = await Favorites.find({ user: req.userId }).sort({
      _id: -1,
    });
    res.json({
      success: true,
      type: favoritesList,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports.addFavoritesList = async (req, res) => {
  const productId = req.params.id;
  try {
    const newFavorites = new Favorites({
      product: productId,
      user: req.userId,
    });

    await newFavorites.save();

    res.json({
      success: true,
      message: "Add favorites item successfully",
      favorites: newFavorites,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports.deleteFavoritesList = async (req, res) => {
  try {
    const favoritesDeleteCondition = {
      product: req.params.id,
      user: req.userId,
    };

    const deletedFavorites = await Favorites.findOneAndDelete(
      favoritesDeleteCondition
    );

    if (!deletedFavorites)
      return res
        .status(401)
        .json({
          success: false,
          message: "Favorites product or Authorized not found",
        });

    res.json({
      success: true,
      message: "Deleted favorites product successfully",
      favorites: deletedFavorites,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
