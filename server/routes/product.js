const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");

const controller = require("../controllers/product");

router.get("/most_favorites", controller.getMostFavoritesProducts);

router.get("/discount_products", controller.getDiscountProducts);

router.get("/", controller.getProducts);

router.post("/", verifyToken, controller.addProduct);

router.put("/add_discount/:id", verifyToken, controller.addDiscount);

router.put("/:id", verifyToken, controller.updateProduct);

router.delete("/:id", verifyToken, controller.deleteProduct);

module.exports = router;
