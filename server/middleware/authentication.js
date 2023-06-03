const CustomError = require("../errors");
const { isTokenValid } = require("../utils");

const authenticateUser = async (req, res, next) => {
  const { token } = req.signedCookies;

  if (!token) {
    console.log("error, token does not exist");
  } else {
    console.log("token acquired");
  }

  next();
};

module.exports = {
  authenticateUser,
};
