const express = require("express");
const cors = require("cors");
const app = express();

const rootRouter = require("../backend/routes/index");
app.use(cors());
app.use(express.json());



app.use("/api/v1", rootRouter);

app.get("/",(req, res) => {
  res.json({
    message: "Hello World"
  })
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
