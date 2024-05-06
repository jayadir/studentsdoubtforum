const express = require("express");
const mongoose = require("mongoose");
const app = express();
const auth=require("../middlewares/Authorization");
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
          from: "answers",
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

exports.getOneQuestion = async (req, res) => {
  try {
    const data = await question.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(req.params.id) },
      },
      {
        $lookup: {
          from: "answers",
          let: { question_id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$question", "$$question_id"], // Changed field name from question_id to question
                },
              },
            },
            {
              $project: {
                _id: 1,
                answeredBy: 1, // Changed field name from user to answeredBy
                Answer: 1, // Changed field name from answer to Answer
                answeredAt: 1, // Changed field name from created_at to answeredAt
                question: 1, // Changed field name from question_id to question
                upvotes: 1,
                downvotes: 1,
                comment: 1,
              },
            },
            {
              $sort: { upvotes: -1 }, // Sort based on upvotes in descending order
            },
          ],
          as: "answerDetails",
        },
      },
      {
        $lookup: {
          from: "comments",
          let: { question_id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$question", "$$question_id"], // Changed field name from question_id to question
                },
              },
            },
            {
              $project: {
                _id: 1,
                question: 1, // Changed field name from question_id to question
                commentedBy: 1,
                comment: 1,
                commentedAt: 1,
                answer: 1,
              },
            },
          ],
          as: "comments",
        },
      },
      {
        $project: {
          __v: 0,
        },
      },
    ]);

    res.status(200).send(data);
  } catch (err) {
    res.status(400).send({
      error: err,
      message: "Question not found",
    });
  }
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
      response,
    });
  } catch (error) {
    res.status(500).json({ status: false });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const response =await question.findByIdAndDelete(req.params.id);
    res.status(200).json({status:true, resp:response})
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};
