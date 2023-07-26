const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    rollNo:{
        type:String,
        required:true,
    },
    collegename:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Admin",
        required:true,
    },
    course:{
        type:String,
        required:true,
    },
    branch:{
        type:String,
    },
    year:{
        type:String,
        required:true,
    },
    semester:{
        type:String,
        required:true,
    },
    section:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:"Student"
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    examResult: [
        {
            teacher: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Teacher',
            },
            marksObtained: {
                type: Number,
                default: 0,
            },
            totalMarks: {
                type: Number,
                default:100,
            },
        }
    ],
    attendance: [{
        date: {
            type: Date,
            required: true
        },
        status: {
            type: String,
            enum: ['Present', 'Absent'],
            required: true
        },
        teacher:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Teacher",
            required: true
        },
    }]
},
{
    timestamps:true
},
);

module.exports = mongoose.model("Student",studentSchema);