const Comment = require("../models/comment");

module.exports.getComment = async (req, res) => {
  try {
    const commentList = await Comment.find({ product: req.params.id })
      .populate("user")
      .sort({ _id: -1 });
    res.json({
      success: true,
      comment: commentList,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports.addComment = async (req, res) => {
  const { content } = req.body;
  try {
    const newComment = new Comment({
      product: req.params.id,
      user: req.userId,
      content,
    });

    await newComment.save();

    res.json({
      success: true,
      message: "Add comment successfully",
      comment: newComment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports.updateComment = async (req, res) => {
  const { content, feedback } = req.body;
  if (!feedback) {
    try {
      let updateComment = {
        content,
      };

      const commentUpdateCondition = { _id: req.params.id };

      updateComment = await Comment.findOneAndUpdate(
        commentUpdateCondition,
        updateComment,
        { new: true }
      );

      // khi co 2 comment trong 1 product thi duy nhat la Id cua cmt
      //   if (!updateComment)
      //   return res
      //     .status(401)
      //     .json({ success: false, message: "Comment or Product not found" });
    } catch (error) {}
  }
};
