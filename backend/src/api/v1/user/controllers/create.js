const User = require("../../../../models/user.model/user.model");
const { UAParser } = require("ua-parser-js");
// const geoip = require("geoip-country");

const create = async (req, res) => {
  try {
    const { name, email, photoURL, providerData, ip } = req.body;

    console.log(email);

    const parser = new UAParser(req.headers["user-agent"]);
    const deviceInfo = parser.getResult();
    // const locationInfo = geoip.lookup(ip);

    const existingUser = await User.findOne({
      $or: [{ email }, { email: providerData[0].email }],
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({
      name: providerData[0].displayName || name,
      email: providerData[0].email || email,
      photoURL: photoURL || null,
      deviceInfo,
      // locationInfo,
      providerData,
      registeredAt: new Date(),
    });

    // Save user to database
    await newUser.save();

    return res.status(201).json({
      message: "User created successfully",
      userId: newUser._id,
      user: newUser,
    });
  } catch (error) {
    console.error("User creation error:", error);
    return res.status(500).json({
      message: "Error creating user",
      error: error.message,
    });
  }
};

module.exports = create;
