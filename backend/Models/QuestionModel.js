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
        type:Object
    },
    comment:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comments"
    }

})
module.exports = mongoose.model("Questions",QuestionSchema);