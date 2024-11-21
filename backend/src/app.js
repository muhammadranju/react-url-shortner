const express = require("express");
const app = express();
const middleware = require("./app/middleware");
const router = require("./routes");
const {
  controller: { errorHandler, notFount },
} = require("./api/v1/global");

app.use([middleware, router]);

app.use([notFount, errorHandler]);

module.exports = app;
