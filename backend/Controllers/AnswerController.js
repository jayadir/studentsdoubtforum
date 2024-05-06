const express = require("express");
const app = express();
const auth=require("../middlewares/Authorization");
const answer = require("../Models/AnswerModel");
app.use(express.json());
exports.createAnswer = async (req, res) => {
  const answerData = new answer({
    Answer: req.body.answer,
    answeredBy: req.body.answeredBy,
    question: req.body.question,
  });
  try {
    const givenAnswer = await answerData.save();
    res.status(200).send({
      status: true,
      message: "Answer Created Successfully",
      data: givenAnswer,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
exports.getAnswer = async (req, res) => {
  const questionId = req.params.question.Id;
  try {
    const answers = await answer.find(questionId);
    res.status(200).json({
      status: true,
      data: answers,
    });
  } catch (error) {}
};
exports.vote = async (req, res) => {
    const { id } = req.params; 
    const { vote } = req.query; 
  
    try {
      const response =
        vote === "upvote"
          ? await answer.findByIdAndUpdate(id, { $inc: { upvotes: 1 } })
          : await answer.findByIdAndUpdate(id, { $inc: { downvotes: 1 } });
  
      res.status(200).json({
        status: true,
        upvotes: vote === "upvote" ? response.upvotes : response.downvotes,
      });
    } catch (error) {
      res.status(500).json({
        error: error,
      });
    }
  };
  