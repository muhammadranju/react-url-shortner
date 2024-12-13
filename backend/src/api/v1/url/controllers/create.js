const ShortUrl = require("../../../../models/url.model/url.model");

const create = async (req, res) => {
  try {
    const { url } = req.body;
    res.status(201).json(url);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating short URL" });
  }
};

module.exports = create;
