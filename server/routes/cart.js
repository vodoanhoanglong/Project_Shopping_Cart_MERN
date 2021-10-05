const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const controller = require("../controllers/cart");

router.get("/", controller.getOrder);
router.post("/", verifyToken, controller.addOrder);

module.exports = router;
