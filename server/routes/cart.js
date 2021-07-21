const express = require("express");
const router = express.Router();

const controller = require("../controllers/cart");

router.post("/", controller);

module.exports = router;
