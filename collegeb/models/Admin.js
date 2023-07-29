 const mongoose = require("mongoose");

 const adminSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    collegename:{
        type:String,
        unique:true,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    role: {
        type: String,
        default: "Admin"
    },
    password:{
        type:String,
        required:true,
    },
    profileDP: {
        type: String,
        default:'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg',
    },
    verifytoken: { //for password resetting process
        type: String,
    }
 },
 { timestamps:true }
 );

 module.exports = mongoose.model("Admin",adminSchema);