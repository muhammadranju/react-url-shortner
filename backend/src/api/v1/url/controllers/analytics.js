const Analytics = require("../../../../models/analyticsSchema.model/analyticsSchema.model");
const ShortUrl = require("../../../../models/url.model/url.model");

const analytics = async (req, res) => {
  try {
    const { id } = req.params;

    const findShortUrl = await ShortUrl.findOne({ shotLink: id });

    if (!findShortUrl) {
      return res.status(404).json({ status: 404, success: false, message: "Short URL not found" });
    }
    const findAnalytics = await Analytics.find({shortUrlId: findShortUrl._id});


    const groupedData = findAnalytics.reduce((acc, record) => {
      const { time } = record.dateTime;
      const { type } = record.device;

      // Find if a record already exists for the same time
      let existingEntry = acc.find(entry => entry.name === time);

      if (existingEntry) {
        // Increment the count for Desktop or Mobile
        existingEntry[type] = (existingEntry[type] || 0) + 1;
      } else {
        // Create a new entry for the time
        acc.push({
          name: time,
          Desktop: type === "Desktop" ? 1 : 0,
          Mobile: type === "Mobile" ? 1 : 0
        });
      }

      return acc;
    }, []);
    console.log(findAnalytics);
    console.log(groupedData);
    // console.log(findShortUrl);

    res.status(200).json({
      status: 200,
      success: true,
      message: "Short URL Analytics",
      analytics: findShortUrl,
      lineChartData:groupedData
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error short URL" });
  }
};

module.exports = analytics;
