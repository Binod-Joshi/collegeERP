const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

dotenv.config();
app.use(express.json({limit:"10mb"}));
app.use(cors());

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(console.log("connected to the mongoDB"))
.catch((err) => console.log("Not Connected To The Network",err));

const authRoute = require("./routes/auth");
const course = require("./routes/admin/course");
const studentad = require("./routes/admin/student");
const teacherad = require("./routes/admin/teacher");
//for teacherblock
const attendanceS = require("./routes/teacher/attendance");
const markS = require("./routes/teacher/mark")
//for studentblock
const attendance = require("./routes/student/attendanceInS")
const mark = require("./routes/student/markInS");
const teacherSubjects = require("./routes/student/teachersOfparticularCourse")
//for notice
const notice = require("./routes/notice/notice");

app.use("/api/auth",authRoute);
app.use("/api/courses",course);
app.use("/api/students",studentad);
app.use("/api/teachers",teacherad);
app.use("/api/attendance",attendanceS);
app.use("/api/mark",markS);
app.use("/api/students",teacherSubjects);
// for studentblock
app.use("/api/attendanceofstudent", attendance);
app.use("/api/markofstudent", mark);
app.use("/api/notice", notice);

app.listen(5000);
