const jwt = require("jsonwebtoken");

const createJWT = ({ payload }) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

const isTokenValid = ({ token }) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

const attachTokenToResponse = ({ res, user }) => {
  const token = createJWT({ payload: user });

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 86400000),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
};

module.exports = {
  createJWT,
  isTokenValid,
  attachTokenToResponse,
};
