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
  question
    .aggregate([
      {
        $lookup: {
          from: "Answers",
          localField: "_id",
          foreignField: "question",
          as: "answers",
        },
      },
      {
        $lookup: {
          from: "Comments",
          localField: "answers._id",
          foreignField: "answer",
          as: "comments",
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ])
    .exec()
    .then((data) => {
      res.status(200).send({
        status: true,
        data: data,
      });
    })
    .catch((error) => {
      res.status(500).json({ status: false, message: error.message });
    });
};
exports.upvote = async (req, res) => {
  try {
    const response = await question.findByIdAndUpdate(
      req.params.id,
      { $inc: { upvotes: 1 } },
      { new: true }
    );
    res.status(200).send({
      status: true,
    });
  } catch (error) {
    res.status(500).json({ status: false });
  }
};
exports.downvote = async (req, res) => {
  try {
    const response = await question.findByIdAndUpdate(
      req.params.id,
      { $inc: { downvotes: 1 } },
      { new: true }
    );
    res.status(200).json({
      status: true,
      response
    });
  } catch (error) {
    res.status(500).json({ status: false });
  }
};
