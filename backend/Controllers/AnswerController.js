const express = require("express");
const app = express();
const answer = require("../Models/AnswerModel");
app.use(express.json());
exports.createAnswer = async (req, res) => {
    const answerData=new answer({
        Answer:req.body.answer,
        answeredBy:req.body.answeredBy,
        question:req.body.question,
    });
    try {
        const givenAnswer=await answerData.save();
        res.status(200).send({
            status:true,
            message:"Answer Created Successfully",
            data:givenAnswer,
        });
    } catch (error) {
        res.status(500).json({status:false,message:error.message});
    }
}