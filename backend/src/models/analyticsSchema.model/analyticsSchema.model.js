const mongoose = require("mongoose");
// const moment = require("moment");

const analyticsSchema = new mongoose.Schema(
  {
    shortUrlId: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: "ShortUrl", // Reference to the Short URL schema
      required: true,
    },
    location: {
      type: String,
      lowercase: true
      // required: true,
    },
    device: {
      name: {
        type: String,
        lowercase: true
      },
      type: {
        type: String,
        lowercase: true
      },
    },

    dateTime: {
      date: {
        type: String,
        // default: moment().format("L"),
      },
      time: {
        type: String,
        // default: moment().format("LT"),
      },
    },
  },
  { timestamps: true }
);

const Analytics = mongoose.model("Analytics", analyticsSchema);

module.exports = Analytics;
