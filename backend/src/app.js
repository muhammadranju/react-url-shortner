const express = require("express");
const app = express();
const middleware = require("./app/middleware");
const router = require("./routes");
const passport = require("passport");
const requestIp = require("request-ip");

const {
  controller: { errorHandler, notFount },
} = require("./api/v1/global");

require("./config/passport")(passport);

app.use(requestIp.mw()); // Middleware to parse IP
app.use(passport.initialize());
app.use([middleware, router]);
app.use([notFount, errorHandler]);

module.exports = app;
