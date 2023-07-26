const router = require("express").Router();
const Notice = require("../../models/Notice");
const {jwtProtect} = require("../../middleware/authMiddleware");

router.post("/setnotice",jwtProtect , async(req,res) => {
    let {collegeid} = req.body;
    // console.log(role,notice,collegeid);
    try {
        let collegename = collegeid;
        let noticee = new Notice({
      ...req.body,
      collegename:collegename,
    })
    let result = await noticee.save();
    res.status(200).json("send successfully")
    } catch (error) {
        res.status(400).json(error)
    }
    
    
});

router.get("/getnotice/:collegename",jwtProtect, async(req,res) => {
 try {
    let {collegename} = req.params;
    console.log(collegename);
    let result = await Notice.find({collegename}).sort({ createdAt: -1 });
    res.status(200).json(result)
 } catch (error) {
    res.status(400).json(error)
 }
})

module.exports = router;
