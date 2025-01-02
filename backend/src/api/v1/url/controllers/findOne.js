/* eslint-disable no-undef */
const Analytics = require("../../../../models/analyticsSchema.model/analyticsSchema.model");
const ShortUrl = require("../../../../models/url.model/url.model");
const { UAParser } = require("ua-parser-js");
const moment = require("moment");

const getUserInfo = (req) => {
  const parser = new UAParser(req.headers["user-agent"]);
  const deviceInfo = parser.getResult();
  console.log(deviceInfo);
  return {
    location: "India", // Example location (In production, use a geo-IP library)
    device: {
      name: deviceInfo?.device?.model || "Windows",
      type: deviceInfo?.device?.type || "Desktop",
    },
  };
};

const findOne = async (req, res) => {
  const MAX_HITS = 1000; // Define max hits threshold as a constant
  try {
    const { shortLink } = req.params;
    const { country_name } = req.query;

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

    const userInfo = getUserInfo(req); // Simulated user info
    const newAnalytics = new Analytics({
      shortUrlId: link._id,
      location: country_name,
      device: userInfo.device,
      dateTime: {
        date: moment().format("L"),
        time: moment().format("LT"),
      },
    });
    console.log(userInfo);

    // Save the analytics data to the database
    link.analytics.push(newAnalytics._id);
    await link.save();
    await newAnalytics.save();

       return res.status(302).redirect(link.originalUrl);
  } catch (error) {
    console.log(error);
  }
};

module.exports = findOne;
