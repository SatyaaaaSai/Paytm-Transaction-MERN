const { Router } = require("express");
const { authMiddleWare } = require("../middleware/middleware");

const {Account} = require("../db/db");
const router = Router();

router.get("/balance", authMiddleWare, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  });

  console.log("hello", req.userId);

 return res.status(200).json({
    balance: account.balance,
  });
});

router.post("/transfer", authMiddleWare, async (req, res) => {
  const session = await Mongoose.startSession();

  session.startTransaction();
  const { amount, to } = req.body;
  const account = await Account.findOne({ userId: req.id }).session(session);
  if (!account || account.balance < amount) {
    res.status(400).json({ message: "insufficient balance" });
  }

  const toAccount = await Account.findOne({
    userId: to,
  }).session(session);

  if (!toAccount) {
    res.status(404).json({
      message: "In Valid Account",
    });
  }

  await Account.updateOne(
    {
      userId: req.id,
    },
    {
      $inc: {
        balance: -amount,
      },
    }
  ).session(session);

  await Account.updateOne(
    {
      userId: to,
    },
    {
      $inc: {
        balance: amount,
      },
    }
  ).session(session);

  await session.commitTransaction();

  res.json({
    message: "Transfer Successful",
  });
});
module.exports = router;
