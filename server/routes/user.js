const express = require("express");

const router = express.Router();

const controller = require("../controllers/user");

router.get("/", controller.getUser);
router.put("/:id", controller.saveUser);

module.exports = router;
