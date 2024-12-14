const { default: mongoose } = require("mongoose");
const User = require("../../../../models/user.model/user.model");
const { UAParser } = require("ua-parser-js");
const fetchUserLocation = require("../../../../config/userInfoCollect");
// const geoip = require("geoip-lite");

const update = async (req, res) => {
  try {
    const { userId } = req.params;
    const userIP = req.clientIp;

    const parser = new UAParser(req.headers["user-agent"]);
    const deviceInfo = parser.getResult();
    // const locationInfo = geoip.lookup(userIP);

    const locationInfo = await fetchUserLocation(userIP);

    const isValidId = mongoose.Types.ObjectId.isValid(userId);
    if (!isValidId) {
      return res
        .status(400)
        .json({ status: 400, success: false, message: "Invalid userId" });
    }

    console.log(locationInfo);

    const findUser = await User.findOne({ _id: userId });
    if (findUser) {
      findUser.deviceInfo = deviceInfo;
      findUser.registeredAt = new Date();
      findUser.locationInfo = locationInfo;

      await findUser.save();

      return res.status(200).json({
        status: 200,
        success: true,
        message: "User updated successfully",
        findUser,
      });
    }
    res
      .status(200)
      .json({ status: 400, success: false, message: "User not found" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = update;
