const express = require('express');
const authorization = require("../../middlewares/firebase/auth");
const v1Router = express.Router();


// import routes
const verifyUser = require("./Verify");
const ieltsLms = require("./IeltsLms");
const unlock = require("./Unlock");

v1Router.use("/unlock", unlock);
v1Router.use("/verify", authorization(), verifyUser);
v1Router.use("/ielts-lms", (req,res,next) => { 
    console.log("route called");
    next(); 
}, authorization(), ieltsLms);

module.exports = v1Router;
