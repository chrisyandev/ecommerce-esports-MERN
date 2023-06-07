const CustomError = require("../errors");

const authorizePermissions = (...args) => {
  return (req, res, next) => {
    if (!args.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        "unauthorized access to route: permission not granted"
      );
    }
    next();
  };
};

module.exports = {
  authorizePermissions,
};
