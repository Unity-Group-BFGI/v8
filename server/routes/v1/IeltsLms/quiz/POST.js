const express = require('express')
const quizPOST = express.Router();

const CreateQuizValidate = require("../../../../middlewares/ajv/ielts-lms/CreateQuiz.validate");
const CreateQuizApi = require("../../../../apis/v1/ielts-lms/CreateQuiz.api");

quizPOST.post("/add", CreateQuizValidate(), CreateQuizApi(), (req,res) => {

    res.status(200).json({
        status: true,
        resType: "success",
        res: "add quiz"
    });
});

module.exports = quizPOST;