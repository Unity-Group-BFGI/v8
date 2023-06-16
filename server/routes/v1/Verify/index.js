const express = require('express')
const verifyRoute = express.Router();

const verifyUser = require("../../../middlewares/verifyUser");

verifyRoute.get("/", verifyUser(), (req,res) => {
    res.status(200).json({
        status: true,
        resType: "success"
    });
});

module.exports = verifyRoute;
