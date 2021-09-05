const Cart = require("../models/Order");

module.exports = async (req, res) => {
  const { cart, user, totalPrice, discount, userInformation } = req.body;
  try {
    const newCart = new Cart({
      user,
      userInformation,
      cart,
      discount,
      totalPrice,
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
