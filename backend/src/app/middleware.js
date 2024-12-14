/* eslint-disable no-undef */
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const routes = require("../routes/index");

const corsOptions = {
  origin: process.env.FRONTEND_URL, // Allow requests only from this frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  credentials: true, // If you're using cookies or sessions
};
const middleware = [
  express.json(),
  cookieParser(),
  cors(corsOptions), // cors
  morgan("dev"), // morgan
  routes,
];

module.exports = middleware;
