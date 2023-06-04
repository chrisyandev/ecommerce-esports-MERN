const { createJWT, isTokenValid, attachTokenToResponse } = require("./jwt");
const createTokenUser = require("./createTokenUser");
const checkPermissions = require("./checkPermissions");

module.exports = {
  createJWT,
  isTokenValid,
  attachTokenToResponse,
  createTokenUser,
  checkPermissions,
};
