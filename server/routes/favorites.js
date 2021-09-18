const express = require("express");
const router = express.Router();

const controller = require("../controllers/favorites");

router.get("/", controller.getFavoritesList);
router.get("/find_favorite/:id", controller.findFavorites);
router.post("/:id", controller.addFavoritesList);
router.delete("/:id", controller.deleteFavoritesList);

module.exports = router;
