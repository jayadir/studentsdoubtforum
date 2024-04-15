const express = require("express");
const app = express();
const question = require("../Models/QuestionModel");
app.use(express.json());
exports.createQuestion = async (req, res) => {
  const questionData = new question({
    title: req.body.title,
    description: req.body.description,
    tags: req.body.tags,
    askedBy: req.body.askedBy,
  });
  try {
    const savedQuestion = await questionData.save();
    res.status(200).send({
        status: true,
        message: "Question Created Successfully",
        data: savedQuestion,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

exports.getAllQuestions = async (req, res) => {
  
};
