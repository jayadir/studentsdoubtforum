const express = require("express");
const router = express.Router();
const questionController = require("../Controllers/QuestionControl");
const answerController = require("../Controllers/AnswerController");
const commentController = require("../Controllers/CommentControler");
router.route("/createQuestion")
    .post(questionController.createQuestion);
router.route("/createAnswer")
    .post(answerController.createAnswer);
router.route("/createComment/:questionId/:answerId")
    .post(commentController.createComment);   
module.exports = router;