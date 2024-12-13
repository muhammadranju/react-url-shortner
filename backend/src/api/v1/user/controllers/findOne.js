const User = require("../../../../models/user.model/user.model");

const findOne = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });

    if (user) {
      return res.status(200).json({
        message: "User found successfully",
        user,
      });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

module.exports = findOne;
