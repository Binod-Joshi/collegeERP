const router = require("express").Router();
const Teacher = require("../../models/Teacher");
const { jwtProtect } = require("../../middleware/authMiddleware");

router.post("/getteachers", jwtProtect, async (req, res) => {
  try {
    let { course, branch, year, semester, section, collegename } = req.body;
    // console.log({ course, branch, year, semester, section, collegename });
    semester = Number(semester);
    let teachers = await Teacher.find({}).populate("course");
    teachers = teachers.filter((teacher) => {
       return (
        teacher.course &&
        teacher.course.course.toLowerCase() === course.toLowerCase() &&
        teacher?.course?.branch?.toLowerCase() === branch?.toLowerCase() &&
        teacher.course.year.toLowerCase() === year.toLowerCase() &&
        teacher.course.semester === semester &&
        teacher.course.section.toLowerCase() === section.toLowerCase() &&
        collegename === collegename
       )
    })
    let length = teachers?.length;
    res.status(200).json(length);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
