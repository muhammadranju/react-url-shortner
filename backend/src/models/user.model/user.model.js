const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    photoURL: {
      type: String,
      default: null,
    },
    email: {
      type: String,
    },

    deviceInfo: {
      type: Object,
    },
    locationInfo: { type: Object },

    password: {
      type: String,
    },

    accountType: {
      type: String,
      default: "EMAIL_PASSWORD",
    },

    googleId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
