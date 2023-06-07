const CustomError = require("../errors");

const checkPermissions = (requestUser, resourceUserId) => {
  if (requestUser.role === "admin") return;
  if (requestUser.userId === resourceUserId.toString()) return;

  throw new CustomError.UnauthorizedError(
    "unauthorized access to route: resource does not belong to user"
  );
};

module.exports = checkPermissions;
