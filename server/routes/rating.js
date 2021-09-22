const express = require("express");
const router = express.Router();

const controller = require("../controllers/rating");

router.get("/", controller.getRating);
router.post("/", controller.addRating);
router.put("/", controller.updateRating);

module.exports = router;
