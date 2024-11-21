const mongoose = require("mongoose");
const ShortUrl = require("../../../../models/url.model/url.model");

const updateShortUrl = async (req, res) => {
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

    res
      .status(200)
      .json({ data: findShortUrl, message: "Short URL updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating short URL" });
  }
};

module.exports = updateShortUrl;
