const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    notice:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
    },
    date: {
        type: Date,
        // required: true,
        default: Date.now,
    },
    collegename:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Admin",
        required:true,
    }
},
{ timestamps:true}
)

module.exports = mongoose.model("Notice", studentSchema);