const CustomError = require("../errors");
const { isTokenValid } = require("../utils");

const authenticateUser = async (req, res, next) => {
  const { token } = req.signedCookies;

  if (!token) {
    throw new CustomError.UnauthenticatedError(
      "authentication error: undefined token"
    );
  }

  try {
    const { name, id, role } = isTokenValid({ token });
    req.user = { name, id, role };
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError(
      "authentication error: invalid token"
    );
  }
};

module.exports = {
  authenticateUser,
};
