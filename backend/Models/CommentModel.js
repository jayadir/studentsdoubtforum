const mongoose=require('mongoose');
const commentSchema=new mongoose.Schema({
    comment:{
        type:String,
        required:true,
    },
    commentedBy:{
        type:Object,
    },
    commentedAt:{
        type:Date,
        default:Date.now
    },
    question:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Questions"
    },
    answer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Answers"
    }
});
module.exports=mongoose.model("Comments",commentSchema);