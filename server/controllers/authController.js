const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { attachTokenToResponse, createTokenUser } = require("../utils");

const register = async (req, res) => {
  const { email, name, password } = req.body;

  const emailAlreadyExists = await User.findOne({ email: email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("email already exists");
  }

  const isFirstUser = (await User.countDocuments({})) === 0;
  const role = isFirstUser ? "admin" : "user";

  const user = await User.create({
    name: name,
    email: email,
    password: password,
    role: role,
  });

  const tokenUser = createTokenUser(user);
  attachTokenToResponse({ res: res, user: tokenUser });

  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError.BadRequestError("please provide email and password");
  }

  const userFound = await User.findOne({ email });

  if (!userFound) {
    throw new CustomError.UnauthenticatedError("invalid email");
  }

  const isPasswordCorrect = await userFound.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("invalid password");
  }

  const tokenUser = createTokenUser(user);
  attachTokenToResponse({ res: res, user: tokenUser });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const logout = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(Date.now()),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });

  res.status(StatusCodes.OK).json({ msg: "user logged out" });
};

module.exports = {
  register,
  login,
  logout,
};
