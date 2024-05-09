const express = require("express");
const router = express.Router();
const questionController = require("../Controllers/QuestionControl");
const answerController = require("../Controllers/AnswerController");
const userController = require("../Controllers/UserController");
const commentController = require("../Controllers/CommentControler");
router.route("/createQuestion")
    .post(questionController.createQuestion);
router.route("/createAnswer")
    .post(answerController.createAnswer);
router.route("/createComment/:questionId/:answerId")
    .post(commentController.createComment);   
router.route("/getAllQuestions")
    .get(questionController.getAllQuestions);
router.route("/upvote/:id")
    .put(questionController.upvote);
router.route("/downvote/:id")
    .put(questionController.downvote);
router.route("/getOneQuestion/:id")
    .get(questionController.getOneQuestion);
router.route("/deleteQuestion/:id")
    .delete(questionController.deleteQuestion);
router.route("/answer/:id")
    .put(answerController.vote);
router.route("/User")
    .post(userController.createUser)
    .get(userController.getUser);
router.route("/userQuestion/:uid")
    .get(questionController.getUserQuestions)
    

router.route("/searchquestions")
    .get(questionController.searchQuestions);
module.exports = router;