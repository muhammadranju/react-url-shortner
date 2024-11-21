const ShortUrl = require("../models/shortURLModel");
const findAll = async (req, res) => {
  try {
    const shortUrls = await ShortUrl.find();

    let totalHits = 0;
    for (let i = 0; i < shortUrls.length; i++) {
      const shortUrl = shortUrls[i];
      totalHits += shortUrl.totalHits;
    }
    res.status(200).json({
      message: "All short URLs retrieved successfully",
      count: shortUrls.length,
      totalHits,
      data: shortUrls,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error retrieving all short URLs" });
  }
};

module.exports = findAll;
