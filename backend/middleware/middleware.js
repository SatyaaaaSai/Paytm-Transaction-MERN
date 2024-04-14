const jwt = require("jsonwebtoken");
const { JWT_TOKEN } = require("../config");
const authMiddleWare = (req, res, next) => {
  const authToken = req.headers.authorization;
  console.log("Auth token: " + authToken);
  if (!authToken || !authToken.startsWith("Bearer")) {
    return res.status(401).json({});
  }
  const token = authToken.split(" ")[1];
  console.log("Token: " + token);
  try {
    const decoded = jwt.verify(token, JWT_TOKEN);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({});
  }
};

module.exports = {
  authMiddleWare,
};
