const express = require("express"); // const {Router}= require("express");
const router = express.Router();    // const router=Router();

const userRouter=require("./user");

const {authMiddleware} = require("../middleware/middleware");
const {updateSchema} = require("../types");
const {User}=require("../db/db");


router.use("/user", userRouter);

router.put("/user",authMiddleware,async (req,res)=>{

    const {success} = updateSchema.safeParse(req.body);
    if(!success){
        res.status(411).json({
            message:"Error While ipdating the details "
        })
    }

    await User.updateOne({_id:req.id},req.body);
    res.json({
        message:"Successfully updated the details"
    })

})

module.exports = router;
