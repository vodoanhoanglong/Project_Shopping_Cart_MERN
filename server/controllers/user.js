const User = require("../models/User");
const Cart = require("../models/Order");

module.exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports.getOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const usersOrder = await Cart.find({ user: id });
    res.json({
      success: true,
      order: usersOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports.saveUser = async (req, res) => {
  const { _id, fullName, phone, address, gender, dateOfBirth, couponCode } =
    req.body;

  try {
    let updatedUser = {
      fullName,
      phone,
      address,
      gender,
      dateOfBirth,
    };

    const checkCouponCode = await User.find({
      couponCode: { $elemMatch: { name: couponCode.name } },
    });
    if (checkCouponCode.length !== 0)
      return res
        .status(401)
        .json({ success: false, message: "You already has this coupon code" });

    let updateCoupon = { couponCode };

    const userUpdateCondition = { _id };

    updatedUser = await User.findOneAndUpdate(
      userUpdateCondition,
      !couponCode ? updatedUser : { $addToSet: updateCoupon },
      {
        new: true,
      }
    );
    if (!updatedUser)
      return res
        .status(401)
        .json({ success: false, message: "User or Authorized not found" });

    res.json({
      success: true,
      message: "Updated user successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
