const User = require("../../../../models/user.model/user.model");

const findAll = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });

    res.status(200).json({
      status: 200,
      success: true,
      message: "User found successfully",
      userData: user?.deviceInfo,
      locationInfo: user?.locationInfo,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = findAll;
