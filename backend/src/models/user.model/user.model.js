const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    photoURL: {
      type: String,
    },
    email: {
      type: String,
    },

    userInfo: {
      country: {
        type: String,
      },
      state: {
        type: String,
      },
      city: {
        type: String,
      },
      location: {
        type: String,
      },
      device: {
        type: String,
      },
      browser: {
        type: String,
      },
      ip: {
        type: String,
      },
      os: {
        type: String,
      },
      deviceType: {
        type: String,
      },
    },

    userLinks: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Url",
      default: [],
    },
    dateTime: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
