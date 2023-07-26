const router = require("express").Router();
const Student = require("../../models/Student")
const {jwtProtect} = require("../../middleware/authMiddleware");
const Teacher = require("../../models/Teacher");

// take attendance 
router.post("/takeAttendance", jwtProtect, async (req, res) => {
    const { date, status, teacher, student } = req.body;
  
    try {
      let student1 = await Student.findOne({ _id: student });
  
      if (student1) {
        // Check if attendance entry for the given date and teacher already exists
        const existingEntry = student1.attendance.find(
          (entry) => entry.date.toISOString().split("T")[0] === date && entry.teacher.toString() === teacher
        );
  
        if (existingEntry) {
          // Update the status for the existing attendance entry
          existingEntry.status = status;
        }else {
          // Create a new attendance entry
          const attendanceEntry = {
            date: new Date(date),
            status: status,
            teacher: teacher
          };
          student1.attendance.push(attendanceEntry);
        }
        await student1.save();
        res.status(200).json({ message: "attendance added sucessfully" });
      } else {
        res.status(404).json({ message: "Student not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  

  // get attendance of particular subject
router.post("/getAttendance", jwtProtect, async (req, res) => {
  const { teacher, student } = req.body;

  try {
    let student1 = await Student.findOne({ _id: student });

    if (student1) {
      const result = student1.attendance.filter(
        (entry) => entry.teacher.toString() === teacher
      );
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
  

module.exports =router;