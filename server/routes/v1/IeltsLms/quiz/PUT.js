const express = require('express');
const quizPUT = express.Router();
const EditQuizValidator = require("../../../../middlewares/ajv/ielts-lms/EditQuiz.validate");
const QuizEditApi  = require("../../../../apis/v1/ielts-lms/QuizEdit.api");

quizPUT.put("/update/:id", EditQuizValidator(), QuizEditApi(), (req,res) => {
    res.status(200).json({
        status: true,
        resType: "success",
        res: "update quiz"
    });
});

module.exports = quizPUT;