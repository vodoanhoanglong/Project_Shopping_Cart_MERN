const Comment = require("../models/comment");

module.exports.getComment = async (req, res) => {
  try {
    const commentList = await Comment.find({ product: req.params.id })
      .populate("user")
      .sort({
        _id: -1,
      });
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
  const { _id, _idFeedback, content, feedback } = req.body;

  {
    try {
      let updateComment = {
        content,
      };
      const commentUpdateCondition =
        feedback && !_idFeedback
          ? {
              _id,
              product: req.params.id,
            }
          : !_idFeedback
          ? {
              _id,
              product: req.params.id,
              user: req.userId,
            }
          : {
              _id,
              "feedback._id": _idFeedback,
              "feedback.user": req.userId,
              product: req.params.id,
            };
      updateComment = await Comment.findOneAndUpdate(
        commentUpdateCondition,
        feedback && !_idFeedback
          ? { $addToSet: { feedback } }
          : !_idFeedback
          ? updateComment
          : { $set: { "feedback.$.content": feedback.content } },
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
  console.log(req.userId);
  const { _id, _idFeedback } = req.body;
  try {
    const commentDeleteCondition = !_idFeedback
      ? {
          _id,
          product: req.params.id,
          user: req.userId,
        }
      : {
          "feedback._id": _idFeedback,
          product: req.params.id,
          "feedback.user": req.userId,
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
