const express = require('express')
const quizRoute = express.Router();

const GET = require("./GET");
const POST = require("./POST");
const PUT = require("./PUT");


quizRoute.use(GET);
quizRoute.use(POST);
quizRoute.use(PUT);

module.exports = quizRoute;