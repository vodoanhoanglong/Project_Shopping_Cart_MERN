const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");

const controller = require("../controllers/product");

router.get("/most_favorites", controller.getMostFavoritesProducts);

router.get("/", controller.getProducts);

router.post("/", verifyToken, controller.addProduct);

router.put("/:id", verifyToken, controller.updateProduct);

router.delete("/:id", verifyToken, controller.deleteProduct);

module.exports = router;
