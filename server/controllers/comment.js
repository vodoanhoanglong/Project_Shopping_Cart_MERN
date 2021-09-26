const Comment = require("../models/comment");

module.exports.getAllComment = async (req, res) => {
  try {
    const commentAllList = await Comment.find({ product: req.params.id })
      .populate("user")
      .sort({
        _id: -1,
      });
    res.json({
      success: true,
      commentAllList,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports.getComment = async (req, res) => {
  try {
    const commentList = await Comment.find({
      product: req.params.id,
      user: req.body.idUser,
    })
      .populate("user")
      .sort({
        _id: -1,
      });
    res.json({
      success: true,
      commentList,
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
  const { _id, content } = req.body;

  {
    try {
      let updateComment = {
        content,
      };
      const commentUpdateCondition = {
        _id,
        product: req.params.id,
        user: req.userId,
      };

      updateComment = await Comment.findOneAndUpdate(
        commentUpdateCondition,
        updateComment,
        { new: true }
      );

      if (!updateComment)
        return res.status(401).json({
          success: false,
          message: "Comment, Authorized or Product not found",
        });

      res.json({
        success: true,
        message: "Updated comment successfully",
        comment: updateComment,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
};

module.exports.deleteComment = async (req, res) => {
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
