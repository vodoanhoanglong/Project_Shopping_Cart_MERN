const express = require("express");

const router = express.Router();

const controller = require("../controllers/auth");
const verifyToken = require("../middleware/auth");

router.get("/", verifyToken, controller.getLogin);

router.post("/register", controller.register);

router.post("/login", controller.login);

module.exports = router;
