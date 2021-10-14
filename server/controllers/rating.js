const Rating = require("../models/Rating");

module.exports.getAllRating = async (req, res) => {
  try {
    let ratingAllList = await Rating.find({ product: req.params.id })
      .populate("user")
      .sort({
        _id: -1,
      });

    res.json({
      success: true,
      isComment: false,
      ratingAllList,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports.getRating = async (req, res) => {
  try {
    let ratingAllList = await Rating.find({ product: req.params.id })
      .populate("user")
      .sort({
        _id: -1,
      });

    const userRating = await Rating.find({
      product: req.params.id,
      user: req.userId,
    }).populate("user");
    if (userRating.length === 0)
      return res.json({
        success: true,
        isComment: false,
        ratingAllList,
      });
    ratingAllList = ratingAllList.filter(
      (rating) => rating.user._id.toString() !== req.userId
    );
    ratingAllList = [...userRating, ...ratingAllList];

    res.json({
      success: true,
      isComment: true,
      ratingAllList,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports.addRating = async (req, res) => {
  const { rating, content, createAt } = req.body;
  try {
    const newRating = new Rating({
      product: req.params.id,
      user: req.userId,
      rating,
      content,
      createAt,
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
  const { rating, content } = req.body;
  try {
    let updateRating = { rating, content };

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
module.exports.deleteRating = async (req, res) => {
  try {
    const ratingDeleteCondition = {
      product: req.params.id,
      user: req.userId,
    };

    const deletedRating = await Rating.findOneAndDelete(ratingDeleteCondition);

    if (!deletedRating)
      return res.status(401).json({
        success: false,
        message: "Rating, Authorized or Product not found",
      });

    res.json({
      success: true,
      message: "Deleted rating successfully",
      rating: deletedRating,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
