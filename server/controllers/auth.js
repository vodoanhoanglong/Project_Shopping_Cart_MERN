const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

module.exports.register = async (req, res) => {
  const { username, password, confirmPassword, email } = req.body;
  if (email) {
    try {
      const user = await User.findOne({ username: email });
      let accessToken;
      if (user) {
        accessToken = jwt.sign(
          { userId: user._id },
          process.env.ACCESS_TOKEN_SECRET
        );
        return res.json({ success: true, accessToken });
      }

      const newUser = new User({ username: email });
      await newUser.save();

      accessToken = jwt.sign(
        { userId: newUser._id },
        process.env.ACCESS_TOKEN_SECRET
      );

      return res.json({
        success: true,
        message: "User created successfully",
        accessToken,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }

  if (!username || !password || !confirmPassword)
    return res
      .status(400)
      .json({ success: false, message: "Please fill out completely" });

  if (!validateEmail(username))
    return res.status(400).json({ success: false, message: "Invalid email" });

  if (password.length < 8)
    return res.status(400).json({
      success: false,
      message: "Password must be 8 characters or more",
    });

  if (password !== confirmPassword)
    return res
      .status(400)
      .json({ success: false, message: "Passwords do not match" });

  try {
    const user = await User.findOne({ username });

    if (user)
      return res.status(400).json({ success: false, message: "Email already" });

    const hashedPassword = await argon2.hash(password);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.json({
      success: true,
      message: "User created successfully",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res
      .status(400)
      .json({ success: false, message: "Please fill out completely" });
  if (!validateEmail(username))
    return res.status(400).json({ success: false, message: "Invalid email" });
  try {
    const user = await User.findOne({ username });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect email or password" });
    if (!user.password)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect email or password" });
    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect email or password" });
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.json({
      success: true,
      message: "User logged successfully",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
