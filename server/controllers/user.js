const User = require("../models/User");

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

module.exports.saveUser = async (req, res) => {
  const { _id, fullName, phone, address, gender, dateOfBirth } = req.body;

  try {
    let updatedUser = {
      fullName,
      phone,
      address,
      gender,
      dateOfBirth,
    };
    const userUpdateCondition = { _id };

    updatedUser = await User.findOneAndUpdate(
      userUpdateCondition,
      updatedUser,
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
