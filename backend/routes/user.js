const { Router } = require("express");
const router = Router();

const jwt = require("jsonwebtoken");
const { schema, signInSchema, updateSchema } = require("../types");
const { User, Account } = require("../db/db");
const { JWT_TOKEN } = require("../config");
const { authMiddleware } = require("../middleware/middleware");

console.log("jwt key is ", JWT_TOKEN);
router.post("/signup", async (req, res) => {
  const { success } = schema.safeParse(req.body);
  console.log("in parsed ");
  console.log(success);
  console.log(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Message already Taken/Incorrect Inputs ",
    });
  }

  const existingUser = await User.findOne({
    username: req.body.username,
  });
  if (existingUser) {
    return res.status(411).json({
      message: "User Already Exists", 
    });
  }

  const newUser = await User.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: req.body.password
  });

  console.log("after taking newUser");
  const userId = newUser._id;

  await Account.create({
    userId,
    balance: 1 + Math.random() * 1000,
  });
  const token = jwt.sign(
    {
      userId,
    },
    JWT_TOKEN
  );

  return res.status(201).json({
    message: "User Created Successfully",
    token,
  });
});

// router.put("/", authMiddleware, async (req, res) => {
//   const { success } = updateSchema.safeParse(req.body)
//   if (!success) {
//       res.status(411).json({
//           message: "Error while updating information"
//       })
//   }

//   await User.updateOne(req.body, {
//       id: req.userId
//   })

//   res.json({
//       message: "Updated successfully"
//   })
// })

router.post("/signin", async (req, res) => {
  const { success } = signInSchema.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Error While logging in input details ",
    });
  }

  const gettingUser = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });
  if (gettingUser) {
    const userId = gettingUser._id;
    const token = jwt.sign(
      {
        userId,
      },
      JWT_TOKEN
    );
    return res.status(200).json({
      message: "User Logged In Successfully",
      token,
    });
    return;
  }
  return res.status(411).json({
    message: "Error While logging in input details ",
  });
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";
  console.log(filter);
  // const users = await User.find({
  //   $or: [
  //     {
  //       firstName: { $regex: filter },
  //     },
  //     {
  //       lastName: { $regex: filter },
  //     },
  //   ],
  // });

  const users = await User.find({
    "$or": [
      {
        firstname: {
          "$regex":filter,
        },
      },
      {
        lastname: {
          "$regex":filter,
        },
      },
    ],
  })
  console.log(users);
  return res.json({
    users: users.map((user) => ({
      id: user._id,
      username: user.username,
      firstName: user.firstname,
      lastName: user.lastname,
    })),
  });
});

module.exports = router;
