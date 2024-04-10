const jwt = require("jwt");
const { JWT_TOKEN } = require("../config");
const authMiddleWare = (req, res, next) => {
  const authToken = req.headers.authorization;
  if (!authToken || authToken.startswith("Bearer ")) {
    return res.status(401).json({});
  }
  const token = authToken.split("")[1];
  try {
    const decoded = jwt.verify(token, JWT_TOKEN);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({});
  }
  module.exports = {
    authMiddleWare,
  };
};
