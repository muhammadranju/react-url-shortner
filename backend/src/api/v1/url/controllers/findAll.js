const ShortUrl = require("../../../../models/url.model/url.model");

const findAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const shortUrls = await ShortUrl.find({ user: req.user.id })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit);

    const totalCount = await ShortUrl.countDocuments();

    res.status(200).json({
      message: "All short URLs retrieved successfully",
      count: shortUrls.length,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
      data: shortUrls,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error retrieving all short URLs" });
  }
};

module.exports = findAll;
