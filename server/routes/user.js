const express = require("express");

const router = express.Router();

const controller = require("../controllers/user");

router.get("/", controller.getUser);
router.get("/:id", controller.getOrder);
router.put("/", controller.saveUser);

module.exports = router;
