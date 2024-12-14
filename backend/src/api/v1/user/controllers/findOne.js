/* eslint-disable no-undef */
const User = require("../../../../models/user.model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const findOne = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        status: 401,
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        status: 401,
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    const userData = {
      name: user.name,
      email: user.email,
      deviceInfo: user.deviceInfo,
      token,
    };

    console.log(userData);
    res.status(200).json({
      status: 200,
      success: true,
      message: "User found successfully",
      userData,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = findOne;
