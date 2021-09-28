const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const controller = require("../controllers/rating");

router.get("/all_rating/:id", controller.getAllRating);
router.get("/:id", verifyToken, controller.getRating);
router.get("/:id", verifyToken, controller.getRating);
router.post("/:id", verifyToken, controller.addRating);
router.put("/:id", verifyToken, controller.updateRating);
router.delete("/:id", verifyToken, controller.deleteRating);

module.exports = router;
