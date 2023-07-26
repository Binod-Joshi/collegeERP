const Student = require("../../models/Student");
const router = require("express").Router();
const {jwtProtect} = require("../../middleware/authMiddleware");

router.get("/getstudents",jwtProtect,async(req,res) => {
    try {
        const result = await Student.find({collegename:req.user.id});
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({message:"Internal Server Error"})
    }
})

// students of particular course students without using directly id
router.post("/singlecoursesstudentlist",jwtProtect,async(req,res) => {
    try {
        let {course,branch,year,semester,section,collegename} = req.body;
        semester = semester.toString();
        console.log(course,branch,year,semester,section,collegename);
        console.log(semester);
        if(collegename === null || collegename === undefined){
          collegename = req.user.id
        }
        console.log(collegename);
        const query = {
          $and: [
            { course: { $regex: course, $options: "i" } },
            { branch: { $regex: branch, $options: "i" } },
            { year: { $regex: year, $options: "i" } },
            { semester: { $regex: semester, $options: "i" } },
            { section: { $regex: section, $options: "i" } },
          ],
          collegename: collegename, // Exact match for collegename (not case-insensitive)
        };
        let result = await Student.find(query);

        res.status(200).send(result);

    } catch (error) {
        res.status(500).send({message:"Internal Server Error"});
    }
})

// delete all students
router.put("/deleteAll", jwtProtect, async (req, res) => {
    try {
      await Student.deleteMany({collegename:req.user.id});
      let result = await Student.find({collegename:req.user.id});
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  });
  
  // delete one student
  router.put("/deleteOne",jwtProtect, async(req,res) => {
    try {
      const requestBody = req.body;
      await Student.deleteOne({_id:requestBody.selectedId})
      let result = await Student.find({collegename:req.user.id});
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  })

module.exports = router;