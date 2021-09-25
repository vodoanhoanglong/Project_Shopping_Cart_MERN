const Rating = require("../models/rating");

module.exports.getAllRating = async (req, res) => {
  try {
    const ratingAllList = await Rating.find({ product: req.params.id })
      .populate("user")
      .sort({ _id: -1 });

    res.json({
      success: true,
      ratingAllList,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports.getRating = async (req, res) => {
  try {
    const ratingList = await Rating.find({
      product: req.params.id,
      user: req.userId,
    })
      .populate("user")
      .sort({ _id: -1 });
    res.json({
      success: true,
      ratingList,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports.addRating = async (req, res) => {
  const { rating } = req.body;
  try {
    const newRating = new Rating({
      product: req.params.id,
      user: req.userId,
      rating,
    });

    await newRating.save();

    res.json({
      success: true,
      message: "Add rating successfully",
      rating: newRating,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports.updateRating = async (req, res) => {
  const { rating } = req.body;
  try {
    let updateRating = { rating };

    const ratingUpdateCondition = { product: req.params.id, user: req.userId };

    updateRating = await Rating.findOneAndUpdate(
      ratingUpdateCondition,
      updateRating,
      { new: true }
    );

    if (!updateRating)
      return res.status(401).json({
        success: false,
        message: "Rating, Authorized or Product not found",
      });

    res.json({
      success: true,
      message: "Updated rating successfully",
      rating: updateRating,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
