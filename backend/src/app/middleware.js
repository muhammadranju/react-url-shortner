/* eslint-disable no-undef */
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const routes = require("../routes/index");

const corsOptions = {
  origin: process.env.FRONTEND_URL, // Frontend origin
  credentials: true, // Allow credentials (cookies)
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"], // Add required headers
};

const middleware = [
  express.json(),
  cookieParser(),
  cors(corsOptions), // cors
  morgan("dev"), // morgan
  routes,
];

module.exports = middleware;
