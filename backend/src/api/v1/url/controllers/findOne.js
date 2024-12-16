/* eslint-disable no-undef */
const ShortUrl = require("../../../../models/url.model/url.model");

const findOne = async (req, res) => {
  const MAX_HITS = 1000; // Define max hits threshold as a constant
  try {
    const { shortLink } = req.params;

    // Atomically find and increment totalHits if link exists
    const link = await ShortUrl.findOneAndUpdate(
      { shotLink: shortLink },
      { $inc: { clicks: 1 } },
      { new: true } // Return the updated document
    );

    // Handle cases where link is not found
    if (!link) {
      return res.redirect(`${process.env.FRONTEND_URL}/not-found`);
    }

    // Check if the link has exceeded maximum allowed hits
    if (link.clicks > MAX_HITS) {
      return res.redirect(`${process.env.FRONTEND_URL}/limit-over`);
    }

    // Redirect to the original URL if all conditions are met
    return res.status(302).redirect(link.originalUrl);
  } catch (error) {
    console.log(error);
  }
};

module.exports = findOne;
