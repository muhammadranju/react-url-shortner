const User = require("../../../../models/user.model/user.model");
const bcrypt = require("bcryptjs");

const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../../../utils/generateToken");

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
    };
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    console.log(req.cookies);

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
