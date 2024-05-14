const mongoose=require('mongoose');
const OptionSchema = new mongoose.Schema({
    option: {
        type: String,
        required: true
    },
    votes: {
        type: Number,
        default: 0
    }
})
const PollSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    options: [OptionSchema],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    voters: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
    ,
    authorName:{
        type:String,
        // required:true
    }

    
})
module.exports = mongoose.model('Poll', PollSchema);