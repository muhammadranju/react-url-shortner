const ShortUrl = require("../../../../models/url.model/url.model");

const create = async (req, res) => {
  try {
    const { url } = req.body;
    const shortUrl = await ShortUrl.create({ url });
    res.status(201).json(shortUrl);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating short URL" });
  }
};

module.exports = create;
