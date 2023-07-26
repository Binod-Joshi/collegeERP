const router = require("express").Router();
const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const generateToken = require("./generateToken");
const Student = require("../models/Student");
const { jwtProtect } = require("../middleware/authMiddleware");
const Teacher = require("../models/Teacher")

// auth for admin
router.post("/registerAdmin", async (req, res) => {
  const { username, collegename, password, email, profileDP, role } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedpass = await bcrypt.hash(password, salt);

    let admin = new Admin({
      username,
      collegename,
      email,
      role,
      password: hashedpass,
      profileDP:
        profileDP ||
        "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg",
    });

    const emailExist = await Admin.findOne({ email });
    const collegeExist = await Admin.findOne({ collegename });

    if (emailExist) {
      res.send({ message: "Email already Exist." });
    } else if (collegeExist) {
      res.send({ message: "collegename already exist." });
    } else {
      admin = await admin.save();
      res.status(200).json({
        _id: admin._id,
        username: admin.username,
        collegename: admin.collegename,
        email: admin.email,
        role: admin.role,
        profileDP: admin.profileDP,
        token: generateToken(admin._id),
      });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.post("/loginAdmin", async (req, res) => {
  const { password, email } = req.body;
  if (req.body.email && req.body.password) {
    let admin = await Admin.findOne({ email });
    if (admin) {
      const validated = await bcrypt.compare(password, admin.password);
      if (validated) {
        // user.password = undefined
        res.send({
          _id: admin._id,
          username: admin.username,
          collegename: admin.collegename,
          email: admin.email,
          role: admin.role,
          profileDP: admin.profileDP,
          token: generateToken(admin._id),
        });
      } else {
        res.send({ message: "Invalid password" });
      }
    } else {
      res.send({ message: "User not found" });
    }
  } else {
    res.send({ message: "Email and password are required" });
  }
});

// auth for students
router.post("/registerStudent", jwtProtect, async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const student = new Student({
      ...req.body,
      collegename: req.user.id,
      password: hashedPass,
    });

    const existingStudentByRollNum = await Student.findOne({
      rollNo: req.body.rollNo,collegename:req.user.id
    });
    const existingStudentByEmail = await Student.findOne({
      email: req.body.email
    });

    if (existingStudentByRollNum) {
      res.send({message: "Roll Number already exists."});
    } else if (existingStudentByEmail) {
      res.send({message: "Student with this email id exist."});
    } else {
      let result = await student.save();

      result.password = undefined;
      res.send(result);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// login student
router.post("/loginStudent", async (req, res) => {
  try {
    const{email,password} =req.body;
  if(req.body.email && req.body.password){
    let student = await Student.findOne({email}).populate("collegename");
    if (student) {
       const validated = await bcrypt.compare(password, student.password);
       if(validated){
        res.send({
          _id: student._id,
          username: student.username,
          rollNo:student.rollNo,
          collegename: student.collegename.collegename,
          collegeid: student.collegename._id,
          course:student.course,
          branch:student.branch,
          year:student.year,
          semester:student.semester,
          section:student.section,
          email: student.email,
          role: student.role,
          profileDP: student?.profileDP,
          token: generateToken(student._id),
        });
       } else {
        res.send({ message:"Invalid password"})
       }
    }else {
      res.send({ message: "User not found"});
    }
    }else{
      res.send({message:"email and password are required"});
    }
   }catch (error) {
    res.status(500).json(error);
  }
});



// auth for teachers
router.post("/registerTeacher",jwtProtect, async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password,salt);
    const teacher = new Teacher({
      ...req.body,
      collegename:req.user.id,
      password:hashedPass
    })
    const existingTeacherByEmail = await Teacher.findOne({
      email: req.body.email
    });
    if(existingTeacherByEmail){
      console.log("email already exist");
      res.send({message:"teacher with same email already exist"})
     
    }else {
      let result = await teacher.save();
      result.password = undefined;
      res.send(result);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/loginTeacher", async (req, res) => {
  try {
    // console.log("loginTeacher");
    const{email,password} =req.body;
  if(req.body.email && req.body.password){
    console.log(email,password);
    let teacher = await Teacher.findOne({email});
    // console.log(teacher);
    teacher = await Teacher.populate(teacher, "course");
    // console.log(teacher);
    teacher = await Teacher.populate(teacher, "collegename");
    // console.log(teacher);
    if (teacher) {
       const validated = await bcrypt.compare(password, teacher.password);
       if(validated){
        res.send({
          _id: teacher._id,
          username: teacher.username,
          collegename: teacher.collegename.collegename,
          collegeid: teacher.collegename._id,
          course:teacher.course.course,
          branch:teacher.course.branch,
          year:teacher.course.year,
          semester:teacher.course.semester,
          section:teacher.course.section,
          email: teacher.email,
          role: teacher.role,
          subject:teacher.subject,
          admin:teacher.collegename.username,
          profileDP: teacher?.profileDP,
          token: generateToken(teacher._id),
        });
       } else {
        res.send({ message:"Invalid password"})
       }
    }else {
      res.send({ message: "User not found"});
    }
    }else{
      res.send({message:"email and password are required"});
    }
   }catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
