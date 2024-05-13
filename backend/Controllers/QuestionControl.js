const express = require("express");
const mongoose = require("mongoose");
const app = express();
const auth = require("../middlewares/Authorization");
const question = require("../Models/QuestionModel");
const messageController = require("./MessageController");
app.use(express.json());

exports.createQuestion = async (req, res) => {
  const questionData = new question({
    title: req.body.title,
    description: req.body.description,
    tags: req.body.tags,
    askedBy: req.body.askedBy,
    uid:req.body.uid,
    Organisation:req.body.Organisation
  });

  try {
    const savedQuestion = await questionData.save();
    res.status(200).send({
      status: true,
      message: "Question Created Successfully",
      data: savedQuestion,
    });
    messageController.sendMessage();
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

exports.getAllQuestions = async (req, res) => {
  const {filter,org}=req.query
  const field=filter==="Newest"?"createdAt":"upvotes"
  question
    .aggregate([
      {
        $match: {
          Organisation: org
        }
      },
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
          [field]: -1,
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
                  $eq: ["$question", "$$question_id"], 
                },
              },
            },
            {
              $project: {
                _id: 1,
                answeredBy: 1,
                Answer: 1, 
                answeredAt: 1, 
                question: 1, 
                upvotes: 1,
                downvotes: 1,
                comment: 1,
              },
            },
            {
              $sort: { upvotes: -1 },
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
                  $eq: ["$question", "$$question_id"], 
                },
              },
            },
            {
              $project: {
                _id: 1,
                question: 1, 
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
    const response = await question.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: true, resp: response });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

exports.searchQuestions = async (req, res) => {
  try {
    const title = req.query.title;
    const response = await question.find({
      $text: { $search: title },
    });
    res.status(200).json({
      status: true,
      data: response,
    });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

exports.getUserQuestions = async (req, res) => {
  const { uid } = req.params;
  try {
    const response = await question.aggregate([
      {
        $match: {
          $expr: {
            $eq: ["$askedBy.uid", uid]
          }
        }
      }
    ]).exec();
    res.status(200).json({
      status: true,
      data: response,
      uid
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message
    });
  }
};

exports.updateQuestion=async (req,res)=>{
  try {
    const {id}=req.params
    const response=await question.findByIdAndUpdate(id,{
      title:req.body.title,
      description:req.body.description
    },{new:true})
    res.status(200).json({
      status:true,
      data:response
    })
  } catch (error) {
    res.status(500).json({
      status:false,
      message:error.message
    })
  }

}