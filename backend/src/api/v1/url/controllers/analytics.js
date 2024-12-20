const ShortUrl = require("../../../../models/url.model/url.model");

const analytics = async (req, res) => {
  try {
    const { id } = req.params;

    const findShortUrl = await ShortUrl.findOne({ shotLink: id });

    res.status(200).json({
      status: 200,
      success: true,
      message: "Short URL Analytics",
      analytics: findShortUrl,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error short URL" });
  }
};

module.exports = analytics;
