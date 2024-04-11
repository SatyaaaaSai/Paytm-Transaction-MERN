const express = require("express"); // const {Router}= require("express");
const router = express.Router();    // const router=Router();

const userRouter=require("./user");

const {authMiddleware} = require("../middleware/middleware");
const {updateSchema} = require("../types");
const {User}=require("../db/db");



router.use("/user", userRouter);



module.exports = router;
