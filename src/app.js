"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const chalk = require("chalk");
const cookieParser = require("cookie-parser");


const app = express();
dotenv.config();
app.use(cookieParser());
const headers = require("./middlewares/headers");
const auth = require("./middlewares/auth");
const errorHandler = require("./middlewares/errorHandler");

app.use(logger(function (tokens, req, res) {
  return chalk.redBright(tokens["remote-addr"](req, res))
    + " " + chalk.blue(tokens.date(req, res))
    + " " + chalk.green(tokens.method(req, res))
    + " " + chalk.white(tokens.url(req, res))
    + " " + chalk.green(tokens.status(req, res))
    + " " + chalk.yellow(tokens["user-agent"](req, res))
    + " " + chalk.cyan(tokens["response-time"](req, res));
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(headers);
// app.use(auth);

const usersRouter = require("./routes/users");

app.use("/users", usersRouter);

app.use(errorHandler);

module.exports = app;