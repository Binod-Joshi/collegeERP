const router = require("express").Router();
const Student = require("../../models/Student");
const {jwtProtect}  = require("../../middleware/authMiddleware");

//to add marks
router.post("/takemark", jwtProtect, async (req, res) => {
    const { marksObtained, totalMarks, student } = req.body;
    try {
      let student1 = await Student.findOne({ _id: student });
  
      if (student1) {
        // Check if mark entry for the given teacher already exists
        const existingEntry = student1.examResult.find(
          (entry) =>  entry.teacher.toString() === req.userT.id
        );
  
        if (existingEntry) {
          // Update the totalMarks and marksobained for the existing mark
          existingEntry.totalMarks = totalMarks;
          existingEntry.marksObtained = marksObtained;
        }else {
          // Create a new mark entry
          const markEntry = {
            marksObtained: marksObtained,
            totalMarks: totalMarks,
            teacher: req.userT.id,
          };

          student1.examResult.push(markEntry);
        }
        await student1.save();
        res.status(200).json({ message: "mark added sucessfully" });
      } else {
        res.status(404).json({ message: "Student not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // to get marks of particular subject of particular teacher
  router.post("/getmark", jwtProtect, async (req, res) => {
    const { student } = req.body;
  
    try {
      let student1 = await Student.findOne({ _id: student });
  
      if (student1) {
        // Check if  marks for the given teacher already exists
        const result = student1.examResult.filter(
          (entry) => entry.teacher.toString() === req.userT.id
        );
  
        console.log(result);
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "Student not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
    
  
  module.exports = router;