const asyncHandler = require("../../../../utils/asyncHandler");

const carateController = asyncHandler(async (req, res) => {
  try {
    res.status(200).json({ message: "Hello About Create Controller" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = carateController;
