const mongoose = require("mongoose");
const QuestionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description:{
        type:String,
        required:true,
    },
    tags:{
        type:Array,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    askedBy:{
        type:Object,
        // ref:"Users"
    },
    uid:{
        type:String,
        ref:"Users"
    },
    comment:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments"
      }],
    upvotes:{
        type:Number,
        default:0
    },
    downvotes:{
        type:Number,
        default:0
    },
    Organisation:{
        type:String,
        // required:true,
    }


})
QuestionSchema.index({title:"text"});
module.exports = mongoose.model("Questions",QuestionSchema);