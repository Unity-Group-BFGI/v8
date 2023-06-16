const express = require('express')
const quizGET = express.Router();
const IeltsLmsGetQuizzes = require("../../../../apis/v1/ielts-lms/IeltsLmsGetQuizzes");
const IeltsLmsGetQuiz = require("../../../../apis/v1/ielts-lms/IeltsLmsGetQuiz");

// get list of quizzes
quizGET.get("/list", IeltsLmsGetQuizzes(), (req,res) => {
    res.status(200).json({
        status: true,
        resType: "success",
        res: "List of quizzes"
    });
});


// get quiz by id
quizGET.get("/get/:id", IeltsLmsGetQuiz(), (req,res) => {
    res.status(200).json({
        status: true,
        resType: "success",
        res: "get quiz by id"
    });
});

module.exports = quizGET;