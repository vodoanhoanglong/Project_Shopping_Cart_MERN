const express = require("express");
const router = express.Router();

const controller = require("../controllers/comment");

router.get("/:id", controller.getComment);
router.post("/:id", controller.addComment);
router.put("/:id", controller.updateComment);
router.delete("/:id", controller.deleteComment);

module.exports = router;
