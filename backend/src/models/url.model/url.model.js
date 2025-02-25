const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    originalUrl: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      required: true,
      unique: true,
    },
    shotLink: {
      type: String,
      required: true,
      unique: true,
    },
    clicks: {
      type: Number,
      default: 0,
    },
    clicksLimit: {
      type: Number,
      default: 1000,
    },
    icon: {
      type: String,
      required: true,
    },
    analytics: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Analytics",
        required: true,
      },
    ],

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    dateTime: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const ShortURL = mongoose.model("Url", urlSchema);

module.exports = ShortURL;
