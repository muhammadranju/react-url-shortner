const User = require("../../../../models/user.model/user.model");
const { UAParser } = require("ua-parser-js");
const bcrypt = require("bcryptjs");

const create = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const parser = new UAParser(req.headers["user-agent"]);
    const deviceInfo = parser.getResult();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "This email is already in use",
      });
    }

    const genSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, genSalt);

    if (!hashedPassword) {
      return res.status(500).json({
        status: 500,
        success: false,
        message: "Error hashing password",
      });
    }

    const user = User({
      name,
      email,
      password: hashedPassword,
      deviceInfo,
    });
    await user.save();

    const userData = {
      name: user.name,
      email: user.email,
      deviceInfo: user.deviceInfo,
    };

    return res.status(201).json({
      status: 201,
      success: true,
      message: "User created successfully",
      userData,
    });
  } catch (error) {
    console.error("User creation error:", error);
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Error creating user",
      error: error.message,
    });
  }
};

module.exports = create;
