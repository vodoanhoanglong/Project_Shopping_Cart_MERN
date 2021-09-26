const express = require("express");
const verifyToken = require("../middleware/auth");
const router = express.Router();

const controller = require("../controllers/comment");

router.get("/all_comment/:id", controller.getAllComment);
router.get("/:id", verifyToken, controller.getComment);
router.post("/:id", verifyToken, controller.addComment);
router.put("/:id", verifyToken, controller.updateComment);
router.delete("/:id", verifyToken, controller.deleteComment);

module.exports = router;
