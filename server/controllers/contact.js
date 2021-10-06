const Contact = require("../models/Contact");

module.exports = async (req, res) => {
  const { fullName, email, phone, message } = req.body;
  try {
    const newContact = new Contact({
      fullName,
      email,
      phone,
      message,
    });

    await newContact.save();

    res.json({
      success: true,
      message: "Add Contact successfully",
      contact: newContact,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
