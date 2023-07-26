const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
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
        type:Number,
        required:true,
    },
    section:{
        type:String,
        required:true,
    },
    collegename:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Admin",
    }
},
{ timestamps:true}
);
module.exports = mongoose.model("Course",courseSchema);