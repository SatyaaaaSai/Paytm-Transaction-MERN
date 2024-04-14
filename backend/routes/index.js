const express = require("express"); // const {Router}= require("express");
const router = express.Router();    // const router=Router();

const userRouter=require("./user");
const accountRouter=require("./account");

const {updateSchema} = require("../types");
const {User}=require("../db/db");



router.use("/user", userRouter);
router.use("/account", accountRouter);


module.exports = router;
