const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const routes = require("../routes/index");

const middleware = [
  express.json(),
  cookieParser(),
  cors(), // cors
  morgan("dev"), // morgan
  routes,
];

module.exports = middleware;
