const mongoose = require('mongoose');
const BlogSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true
  },
  authorId: {
    type: String,
    required: true,
    ref: "Users"
  },
  content: {
    type: String,
    required: true
  },
  isVisible: {
    type: Boolean,
    default: false
  },
  organisation: {
    type: String,
  },
  upvotes:{
    type:Number,
    default:0
  },
  
});

module.exports = mongoose.model("blog", BlogSchema);