const { createJWT, isTokenValid, attachTokenToResponse } = require("./jwt");
const createTokenUser = require("./create-token-user");
const checkPermissions = require("./check-permissions");

module.exports = {
  createJWT,
  isTokenValid,
  attachTokenToResponse,
  createTokenUser,
  checkPermissions,
};
