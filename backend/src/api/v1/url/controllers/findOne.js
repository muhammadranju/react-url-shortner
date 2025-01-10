/* eslint-disable no-undef */
const Analytics = require("../../../../models/analyticsSchema.model/analyticsSchema.model");
const ShortUrl = require("../../../../models/url.model/url.model");
const { UAParser } = require("ua-parser-js");
const moment = require("moment");
const momentZone = require("moment-timezone");
const getUserInfo = (req) => {
  const parser = new UAParser(req.headers["user-agent"]);
  const deviceInfo = parser.getResult();
  return {
    location: "India", // Example location (In production, use a geo-IP library)
    device: {
      name: deviceInfo?.os?.name || "Windows",
      type: deviceInfo?.device?.type || "Desktop",
    },
  };
};

const findOne = async (req, res) => {
  // const LIMIT = 0; // Define max hits threshold as a constant
  try {
    const { shortLink } = req.params;
    const { country_name } = req.query;

    // Atomically find and increment totalHits if link exists
    // const link = await ShortUrl.findOneAndUpdate(
    //   { shotLink: shortLink },
    //   { $inc: { clicks: 1, clicksLimit: -1 } }, // Combine the $inc operations
    //   { new: true } // Return the updated document
    // );

    const link = await ShortUrl.findOne({ shotLink: shortLink });

    var userTimeZone = momentZone.tz.guess();
    var nowInUserTimeZone = momentZone.tz(userTimeZone).format("LT");
    console.log("User Time Zone:", nowInUserTimeZone);
    // Handle cases where link is not found
    if (!link) {
      return res.redirect(`${process.env.FRONTEND_URL}/not-found`);
    }

    // Check if the link has exceeded maximum allowed hits
    if (link.clicksLimit === 0) {
      return res.redirect(`${process.env.FRONTEND_URL}/limit-over`);
    }

    if (link.clicksLimit !== 0) {
      link.clicksLimit = link.clicksLimit - 1;
      link.clicks = link.clicks + 1;
    }

    const userInfo = getUserInfo(req); // Simulated user info
    const newAnalytics = new Analytics({
      shortUrlId: link._id,
      location: country_name,
      device: userInfo.device,
      dateTime: {
        date: momentZone.tz(userTimeZone).format("L"),
        time: momentZone.tz(userTimeZone).format("LT"),
      },
    });
    console.log(newAnalytics);

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
