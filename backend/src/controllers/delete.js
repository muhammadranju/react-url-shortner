const mongoose = require("mongoose");
const ShortUrl = require("../models/shortURLModel");

const deleteShortUrl = async (req, res) => {
  try {
    const { id } = req.params;

    let findShortUrl;
    console.log(mongoose.Types.ObjectId.isValid(id));

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

    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //   return res.status(400).json({ message: "Invalid ID" });
    // }

    res
      .status(200)
      .json({ data: findShortUrl, message: "Short URL updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting short URL" });
  }
};

module.exports = deleteShortUrl;
