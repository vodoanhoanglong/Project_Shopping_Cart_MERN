const Cart = require("../models/Order");

module.exports = async (req, res) => {
  try {
    const newCart = new Cart({
      user: "60f64ec57f23bc23cc5e9301",
      cart: req.body,
      totalPrice: 100000,
    });

    await newCart.save();

    res.json({
      success: true,
      message: "Add Cart successfully",
      cart: newCart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
