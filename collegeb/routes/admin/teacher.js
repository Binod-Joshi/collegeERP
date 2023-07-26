const Teacher = require("../../models/Teacher");
const router = require("express").Router();
const { jwtProtect } = require("../../middleware/authMiddleware");

// get all teachers
router.get("/getteachers", jwtProtect, async (req, res) => {
  try {
    let result = await Teacher.find({collegename:req.user.id});
    result = await Teacher.populate(result, "course");
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// delete all teachers
router.put("/deleteAll", jwtProtect, async (req, res) => {
  try {
    await Teacher.deleteMany({collegename:req.user.id});
    let result = await Teacher.find({collegename:req.user.id});
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// delete one teacher
router.put("/deleteOne",jwtProtect, async(req,res) => {
  try {
    const requestBody = req.body;
    await Teacher.deleteOne({_id:requestBody.selectedId})
    let result = await Teacher.find({collegename:req.user.id});
    result = await Teacher.populate(result, "course");
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
})

module.exports = router;