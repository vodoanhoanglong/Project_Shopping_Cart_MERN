const express = require("express");
const router = express.Router();

const controller = require("../controllers/favorites");

router.get("/", controller.getFavoritesList);
router.post("/:id", controller.addFavoritesList);
router.delete("/:id", controller.deleteFavoritesList);

module.exports = router;
