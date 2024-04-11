const { Router } = require("express");
const router = Router();

const jwt = require("jsonwebtoken");
const { schema, signInSchema } = require("../types");
const { User } = require("../db/db");
const { JWT_TOKEN } = require("../config");

router.post("/signup", async (req, res) => {
  const { success } = schema.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "Message already Taken/Incorrect Inputs ",
    });
  }

  const existingUser = await User.findOne({
    username: req.body.username,
  });
  if (existingUser._id) {
    res.status(411).json({
      message: "Message already Taken/Incorrect Inputs ",
    });
  }

  const newUser = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  const userId = newUser._id;
  const token = jwt.sign(userId, {
    JWT_TOKEN,
  });

  res.status(201).json({
    message: "User Created Successfully",
    token,
  });
});

router.post("/signin", async (req, res) => {
  const { success } = signInSchema(req.body);
  if (!success) {
    res.status(411).json({
      message: "Error While logging in input details ",
    });
  }

  const gettingUser = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });
  if (gettingUser) {
    const userId = gettingUser._id;
    const token = jwt.sign(userId, {
      JWT_TOKEN,
    });
    res.status(200).json({
      message: "User Logged In Successfully",
      token,
    });
    return;
  }
  res.status(411).json({
    message: "Error While logging in input details ",
  });
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";
  const users = await User.findAll({
    $or: [
      {
        firstName: { $regex: filter },
      },
      {
        lastName: { $regex: filter },
      },
    ],
  });

  res.json({
    users: users.map((user) => ({
      id: user._id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    })),
  });
});

router.put("/",authMiddleware,async (req,res)=>{

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
