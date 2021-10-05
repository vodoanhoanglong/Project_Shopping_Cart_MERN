const Cart = require("../models/Order");

module.exports.addOrder = async (req, res) => {
  const { createAt, cart, user, totalPrice, discount, userInformation } =
    req.body;
  try {
    const newCart = new Cart({
      createAt,
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

module.exports.getOrder = async (req, res) => {
  const date = new Date();
  const result = [];
  result.push(new Date().toLocaleDateString("vi-VN").split(", ")[0]);
  for (let i = 1; i < 7; i++)
    result.push(
      new Date(date.setDate(date.getDate() - 1))
        .toLocaleDateString("vi-VN")
        .split(", ")[0]
    );
  const sum = (allOrder, i) =>
    allOrder.reduce(
      (total, { totalPrice, createAt }) =>
        createAt.split(", ")[1] === result[i] ? total + totalPrice : total + 0,
      0
    );

  try {
    const resultAllOrder = [];
    let allOrder = await Cart.find().sort({ _id: -1 });

    for (let i in result) resultAllOrder.push(sum(allOrder, i));

    allOrder = result.reduce(
      (obj, key, index) => ({ ...obj, [key]: resultAllOrder[index] }),
      {}
    );

    res.json({
      success: true,
      allOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
