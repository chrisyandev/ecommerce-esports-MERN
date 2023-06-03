const CustomError = require("../errors");

const authorizePermissions = (...args) => {
  return (req, res, next) => {
    if (!args.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        "unauthorized access to this route"
      );
    }
    next();
  };
};

module.exports = {
  authorizePermissions,
};
