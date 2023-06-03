const CustomError = require("../errors");
const { isTokenValid } = require("../utils");

const authenticateUser = async (req, res, next) => {
  const { token } = req.signedCookies;

  if (!token) {
    throw new CustomError.UnauthenticatedError("authentication invalid");
  }

  try {
    const { name, userId, role } = isTokenValid({ token });
    req.user = { name, userId, role };
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError("authentication invalid");
  }
};

module.exports = {
  authenticateUser,
};
