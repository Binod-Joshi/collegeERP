const Course = require('../../models/Course');
const router = require("express").Router();
const {jwtProtect} = require("../../middleware/authMiddleware")

router.post("/addcourse",jwtProtect,async(req,res) => {
    try {
        let { course, branch, year, semester,section} = req.body;
        let collegename = req.user.id;
        const query = {
            course: { $regex: course, $options: "i" },
            branch: { $regex: branch, $options: "i" },
            year: { $regex: year, $options: "i" },
            semester: semester,
            section: { $regex: section, $options: "i" },
            collegename: collegename, 
          };

        const alreadyExist = await Course.findOne(query)
        if(alreadyExist){
            res.json({message:"Course already exist"});
        }else{
            // Create a new course instance
        const newCourse = new Course({
            course,
            branch,
            year,
            semester,
            section,
            collegename:req.user.id,
        });

        // Save the new course to the database
        const result = await newCourse.save();

        res.status(200).json(result);
        }
        
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// getting courses
router.get("/getcourses",jwtProtect,async(req,res) => {
    try {
        const result = await Course.find({collegename:req.user.id});
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({message:"Internal Server Error"})
    }
});

// deleting one course
router.put("/deleteOne",jwtProtect,async(req,res) => {
    try {
        const requestBody = req.body;
        await Course.deleteOne({_id:requestBody.selectedId})
        let result = await Course.find({collegename:req.user.id});
        res.status(200).send(result);
      } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
      }
}) 


module.exports = router;