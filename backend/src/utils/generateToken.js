/* eslint-disable no-undef */
const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "15m" }); // expires in 15 minutes
};

// Generate refresh token
const generateRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  }); // expires in 30 days
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
