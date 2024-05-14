const express = require("express");
const poll = require("../Models/PollModel");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
exports.createPoll = async (req, res) => {
  try {
    const options = req.body.options.map((option) => ({
      option: option,
      votes: 0,
    }));
    const newPoll = new poll({
      question: req.body.question,
      options: options,
      createdBy: req.body.createdBy,
      authorName: req.body.authorName,
    });
    const savedPoll = await newPoll.save();
    res.status(200).send({
      status: true,
      message: "Poll Created Successfully",
      data: savedPoll,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPolls = async (req, res) => {
  try {
    const polls = await poll.aggregate([
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);
    res.status(200).json({
      status: true,
      data: polls,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.vote = async (req, res) => {
  try {
    const { optionId, userId } = req.body;
    const { pollId } = req.query;
    const response = await poll.findOneAndUpdate(
      {
        _id: pollId,
        "options._id": optionId,
      },
      {
        $inc: {
          "options.$.votes": 1,
        },
        $push: {
          voters: userId,
        },
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      status: true,
      message: "Voted Successfully",
      data: response,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserPolls=async(req,res)=>{
  try{
    const {userId}=req.query;
    const objectId = new mongoose.Types.ObjectId(userId); 
    const polls=await poll.aggregate([
      {
        $match:{
          createdBy:objectId
        }
      }
    ]);
    res.status(200).json({
      status:true,
      data:polls
    })
  }catch(error){
    res.status(500).json({message:error.message});
  }
}