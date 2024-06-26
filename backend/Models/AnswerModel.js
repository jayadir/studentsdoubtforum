const mongoose = require('mongoose');
const AnsSchema=new mongoose.Schema({
    Answer:{
        type:String,
        required:true,
    },
    answeredBy:{
        type:Object,
    },
    answeredAt:{
        type:Date,
        default:Date.now
    },
    question:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Questions"
    },
    upvotes:{
        type:Number,
        default:0
    },
    downvotes:{
        type:Number,
        default:0
    },
    comment:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments"
      }]
})
module.exports=mongoose.model("Answers",AnsSchema);