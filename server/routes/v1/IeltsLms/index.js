const express = require('express')
const ieltsLmsRoute = express.Router();
const Quiz = require("./quiz");

ieltsLmsRoute.use("/quiz", Quiz);

module.exports = ieltsLmsRoute;