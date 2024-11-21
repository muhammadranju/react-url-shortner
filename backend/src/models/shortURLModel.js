const { Schema, model } = require("mongoose");

const linkSchema = new Schema(
  {
    longURL: {
      type: String,
      trim: true,
      // required: true,
    },
    shotLink: {
      type: String,
    },
    shortURL: {
      type: String,
      trim: true,
    },
    totalHits: {
      type: Number,
      default: 0,
    },

    dateTime: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Link = model("Link", linkSchema);

module.exports = Link;
