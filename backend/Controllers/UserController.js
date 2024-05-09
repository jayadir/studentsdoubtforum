const express = require("express");
const app = express();
const auth=require("../middlewares/Authorization");
const user=require("../Models/UserModel");
app.use(express.json());
exports.createUser = async (req, res) => {
  const userData = new user({
    name: req.body.name,
    email: req.body.email,
    // password: req.body.password,
    gender: req.body.gender,
    qualification: req.body.qualification,
    userId: req.body.userId,
    organization: req.body.organization,
    username: req.body.username,
  });
  try {
    const savedUser = await userData.save();
    res.status(200).send({
      status: true,
      message: "User Created Successfully",
      data: savedUser,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

exports.getUser=async(req,res)=>{
  try {
    const {userId}=req.query;
    
    const userData=await user.aggregate([
      {
        $match:{
          userId:userId
        }
      },
      {
        $lookup: {
          from: "Questions", // the other collection
          localField: "uid", // field from the Users documents
          foreignField: "userId", // field from the Questions documents
          as: "userQuestions" // output array field
        }
      }
      
      
    ]).exec()
    res.status(200).json({
      status:true,
      data:userData,
      userId
    })
  } catch (error) {
    res.status(500).json({
      status:false,
      message:error.message
    })
  }
}