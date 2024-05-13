const express = require("express");
const router = express.Router();
const questionController = require("../Controllers/QuestionControl");
const answerController = require("../Controllers/AnswerController");
const userController = require("../Controllers/UserController");
const commentController = require("../Controllers/CommentControler");
const middleware=require('..//middlewares/Authorization');
const messageController=require('../Controllers/MessageController');
router.route("/createQuestion")
    .post(middleware.verifyToken,questionController.createQuestion);
router.route("/createAnswer")
    .post(middleware.verifyToken,answerController.createAnswer);
router.route("/createComment/:answerId")
    .post(middleware.verifyToken,commentController.createComment);   
router.route("/getAllQuestions")
    .get(questionController.getAllQuestions);
router.route("/upvote/:id")
    .put(middleware.verifyToken,questionController.upvote);
router.route("/downvote/:id")
    .put(middleware.verifyToken,questionController.downvote);
router.route("/getOneQuestion/:id")
    .get(middleware.verifyToken,questionController.getOneQuestion);
router.route("/modifyQuestion/:id")
    .delete(middleware.verifyToken,questionController.deleteQuestion)
    .patch(middleware.verifyToken,questionController.updateQuestion);
router.route("/answer/:id")
    .put(middleware.verifyToken,answerController.vote);
router.route("/User")
    .post(middleware.verifyToken,userController.createUser)
    .get(middleware.verifyToken,userController.getUser)
    .patch(middleware.verifyToken,userController.increaseRating);
router.route("/userQuestion/:uid")
    .get(middleware.verifyToken,questionController.getUserQuestions)
router.route("/searchquestions")
    .get(middleware.verifyToken,questionController.searchQuestions);
router.route("/subscribe")
    .post(messageController.subscribe);
module.exports = router;