const jwt = require("jsonwebtoken");
const checkLogIn = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    const { userName, userId } = decoded;
    req.userName = userName;
    req.userId = userId;
    console.log(`${userName} ${userId}`);
    next();
  } catch (error) {
    console.log(error);
    next("Authentication Error!Please log in first.");
  }
};

module.exports = checkLogIn;
