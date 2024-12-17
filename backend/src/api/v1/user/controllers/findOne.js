const User = require("../../../../models/user.model/user.model");
const bcrypt = require("bcryptjs");

const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../../../utils/generateToken");

const findOne = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Email and password are required",
      });
    }

    console.log("Request body:", req.body);

    // Find user and explicitly include the password field
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        status: 401,
        success: false,
        message: "Invalid credentials Email/Password",
      });
    }

    console.log("User found:", user);

    // Compare provided password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        status: 401,
        success: false,
        message: "Invalid credentials Email/Password",
      });
    }

    const accessToken = generateAccessToken({
      id: user._id,
      email: user.email,
    });
    const refreshToken = generateRefreshToken({
      id: user._id,
      email: user.email,
    });

    user.refreshToken = refreshToken;
    await user.save();

    const userData = {
      name: user.name,
      email: user.email,
      deviceInfo: user.deviceInfo,
      token: accessToken,
      refreshToken,
    };

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });

    res.status(200).json({
      status: 200,
      success: true,
      message: "User found successfully",
      userData,
    });
  } catch (error) {
    console.error("Error in findOne:", error);
    res.status(500).json({
      status: 500,
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = findOne;
