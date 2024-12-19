const mongoose = require("mongoose");
const ShortUrl = require("../../../../models/url.model/url.model");

const analytics = async (req, res) => {
  try {
    const { id } = req.params;

    let findShortUrl;

    if (mongoose.Types.ObjectId.isValid(id)) {
      findShortUrl = await ShortUrl.findOne({
        $or: [{ _id: id }],
      });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      findShortUrl = await ShortUrl.findOne({
        $or: [{ shotLink: id }],
      });
    }
    console.log(findShortUrl);
    res.status(200).json({
      status: 200,
      success: true,
      message: "Short URL Analytics",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error short URL" });
  }
};

module.exports = analytics;
