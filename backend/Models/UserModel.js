const mongoose=require('mongoose');
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    qualification:{
        type:String,
        required:true,
    },
    
    gender:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    userId:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        default:0,
    },
    organization:{
        type:String
    },
    questions:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Questions"
    }],
    username:{
        type:String,
        required:true,
    },
    
})
module.exports=mongoose.model("Users",UserSchema)