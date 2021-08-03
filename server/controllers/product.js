const Product = require("../models/product");

module.exports.addProduct = async (req, res) => {
  const { title, description, url, price, type } = req.body;

  if (!title && !url && !price && !type)
    return res
      .status(400)
      .json({ success: false, message: "Content required" });
  try {
    const newProduct = new Product({
      title,
      description,
      url: url.startsWith("https://") ? url : `https://${url}`,
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

    const productUpdateCondition = { _id: req.params.id, user: req.userId };

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
    const productDeleteCondition = { _id: req.params.id, user: req.userId };

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
    const products = await Product.find().sort({ _id: -1 }).limit(12);
    const allProducts = await Product.find().sort({ _id: -1 });
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
