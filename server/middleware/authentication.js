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
    const { name, userId, role } = isTokenValid({ token });
    req.user = { name, userId, role };
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError(
      "authentication error: invalid token"
    );
  }
};

const authorizePermissions = (req, res, next) => {
  if (req.user.role !== "admin") {
    throw new CustomError.UnauthorizedError(
      "unauthorized access to this route"
    );
  }
  next();
};

module.exports = {
  authenticateUser,
  authorizePermissions,
};
