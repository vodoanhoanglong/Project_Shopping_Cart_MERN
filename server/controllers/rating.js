const Rating = require("../models/rating");

module.exports.getAllRating = async (req, res) => {
  try {
    let ratingAllList = await Rating.find({ product: req.params.id })
      .populate("user")
      .sort({
        _id: -1,
      });

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
    let ratingAllList = await Rating.find({ product: req.params.id })
      .populate("user")
      .sort({
        _id: -1,
      });

    const userRating = await Rating.find({
      product: req.params.id,
      user: req.userId,
    }).populate("user");
    let result;
    result = ratingAllList.filter(
      (rating) => rating.user._id.toString() !== req.userId
    );
    ratingAllList = [...userRating, ...result];

    res.json({
      success: true,
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
  const { _id } = req.body;
  try {
    const commentDeleteCondition = {
      _id,
      product: req.params.id,
      user: req.userId,
    };

    const deletedComment = await Comment.findOneAndDelete(
      commentDeleteCondition
    );

    if (!deletedComment)
      return res.status(401).json({
        success: false,
        message: "Comment, Authorized or Product not found",
      });

    res.json({
      success: true,
      message: "Deleted comment successfully",
      comment: deletedComment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
