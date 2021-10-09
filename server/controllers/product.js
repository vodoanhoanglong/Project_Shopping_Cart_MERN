const Product = require("../models/product");
const Favorites = require("../models/favorites");

module.exports.addProduct = async (req, res) => {
  const { title, description, size, url, price, type } = req.body;
  if (!title && !url && !price && !type)
    return res
      .status(400)
      .json({ success: false, message: "Content required" });
  try {
    const newProduct = new Product({
      title,
      description,
      size,
      // url: url.startsWith("https://") ? url : `https://${url}`,
      url,
      price,
      type,
      user: req.userId,
    });

    await newProduct.save();

    res.json({
      success: true,
      message: "Add product successfully",
      product: newProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports.updateProduct = async (req, res) => {
  const { title, description, url, price, type } = req.body;
  if (!title && !description && !url && !price)
    return res
      .status(400)
      .json({ success: false, message: "Content required" });
  try {
    let updatedProduct = {
      title,
      description,
      url: url.startsWith("https://") ? url : `https://${url}`,
      price,
      type,
    };

    const productUpdateCondition = { _id: req.params.id };

    updatedProduct = await Product.findOneAndUpdate(
      productUpdateCondition,
      updatedProduct,
      { new: true }
    );

    if (!updatedProduct)
      return res
        .status(401)
        .json({ success: false, message: "Product or Authorized not found" });

    res.json({
      success: true,
      message: "Updated product successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports.deleteProduct = async (req, res) => {
  try {
    const productDeleteCondition = { _id: req.params.id };

    const deletedProduct = await Product.findOneAndDelete(
      productDeleteCondition
    );

    if (!deletedProduct)
      return res
        .status(401)
        .json({ success: false, message: "Product or Authorized not found" });

    res.json({
      success: true,
      message: "Deleted product successfully",
      product: deletedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports.getProducts = async (req, res) => {
  try {
    const allProducts = await Product.find().sort({ _id: -1 });
    const products = allProducts.slice(0, 12);
    res.json({
      success: true,
      type: {
        products,
        allProducts,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports.getMostFavoritesProducts = async (req, res) => {
  try {
    let mostFavoriteProducts = await Favorites.aggregate([
      {
        $group: {
          _id: "$product", // chỉ group theo trường có _id
          product: { $first: "$product" },
          favorites: { $sum: 1 },
        },
      },
      { $sort: { favorites: -1 } },
      { $limit: 12 },
    ]);

    mostFavoriteProducts = await Product.populate(mostFavoriteProducts, {
      path: "product",
    });

    res.json({
      success: true,
      mostFavoriteProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports.getDiscountProducts = async (req, res) => {
  try {
    const discountProducts = await Product.find()
      .sort({ discount: -1 })
      .limit(12);

    res.json({
      success: true,
      discountProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports.addDiscount = async (req, res) => {
  const { discount } = req.body;
  try {
    let updatedProduct = {
      discount,
    };

    const productUpdateCondition = { _id: req.params.id };

    updatedProduct = await Product.findOneAndUpdate(
      productUpdateCondition,
      { $set: updatedProduct },
      { new: true }
    );

    if (!updatedProduct)
      return res
        .status(401)
        .json({ success: false, message: "Product or Authorized not found" });

    res.json({
      success: true,
      message: "Updated product successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
