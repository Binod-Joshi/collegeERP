const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    role:{
        type:String,
        default: "Teacher"
    },
    password:{
        type:String,
        required:true,
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
        required:"true",
    },
    subject:{
        type:String,
        required:true,
    },
    collegename:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Admin",
        required:true,
    }
});

module.exports = new mongoose.model("Teacher",teacherSchema);