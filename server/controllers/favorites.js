const Favorites = require("../models/favorites");

module.exports.getFavoritesList = async (req, res) => {
  try {
    const favoritesList = await Favorites.find({ user: req.userId })
      .populate("product")
      .sort({
        _id: -1,
      });
    res.json({
      success: true,
      favorites: favoritesList,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports.findFavorites = async (req, res) => {
  try {
    const foundFavorites = await Favorites.find({
      user: req.userId,
      product: req.params.id,
    });
    if (!foundFavorites.length)
      return res.json({
        success: false,
        message: "Favorites product or Authorized not found",
      });
    res.json({
      success: true,
      message: "Found favorites product successfully",
      favorites: foundFavorites,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
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
      return res.status(401).json({
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
