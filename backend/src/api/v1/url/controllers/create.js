const ShortURL = require("../../../../models/url.model/url.model");

const create = async (req, res) => {
  try {
    const { originalUrl } = req.body;
    console.log(req.user);
    console.log(originalUrl);
    res.status(201).json(originalUrl);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating short URL" });
  }
};

module.exports = create;
