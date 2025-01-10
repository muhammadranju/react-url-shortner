const Analytics = require("../../../../models/analyticsSchema.model/analyticsSchema.model");
const ShortUrl = require("../../../../models/url.model/url.model");

const analytics = async (req, res) => {
  try {
    const { id } = req.params;

    const findShortUrl = await ShortUrl.findOne({ shotLink: id });

    if (!findShortUrl) {
      return res
        .status(404)
        .json({ status: 404, success: false, message: "Short URL not found" });
    }
    const findAnalytics = await Analytics.find({
      shortUrlId: findShortUrl._id,
    });

    const groupedData = findAnalytics.reduce((acc, record) => {
      const { date, time } = record.dateTime;
      const { type } = record.device;

      // Combine date and time to ensure unique grouping for the exact click moment
      const dateTimeKey = `${date} ${time}`;

      // Find if a record already exists for the same date and time
      let existingEntry = acc.find((entry) => entry.name === dateTimeKey);

      if (existingEntry) {
        // Increment the count for Desktop or Mobile
        existingEntry[type] = (existingEntry[type] || 0) + 1;
      } else {
        // Create a new entry for the date-time
        acc.push({
          name: dateTimeKey,
          desktop: type === "desktop" ? 1 : 0,
          mobile: type === "mobile" ? 1 : 0,
          tablet: type === "tablet" ? 1 : 0,
        });
      }

      return acc;
    }, []);
    res.status(200).json({
      status: 200,
      success: true,
      message: "Short URL Analytics",
      analytics: findShortUrl,
      findAnalytics,
      lineChartData: groupedData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error short URL" });
  }
};

module.exports = analytics;
