const express = require("express");
const app = express();
const auth=require("../middlewares/Authorization");
const comment = require("../Models/CommentModel");
app.use(express.json());
exports.createComment = async (req, res) => {
  const commentData = new comment({
    comment: req.body.comment,
    commentedBy: req.body.commentedBy,
    question: req.params.questionId,
    answer: req.params.answerId,
  });
  try {
    const savedComment = await commentData.save();
    res.status(200).send({
      status: true,
      data: savedComment,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
