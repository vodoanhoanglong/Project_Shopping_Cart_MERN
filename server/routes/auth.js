const express = require("express");

const router = express.Router();

const controller = require("../controllers/auth");

router.post("/register", controller.register);

module.exports = router;
