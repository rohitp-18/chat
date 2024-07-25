const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/ErrorHandler");

const auth = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please Login First", 403));
  }

  try {
    var a = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return next(new ErrorHandler(error.message, 402));
  }

  const user = await User.findById(a._id);

  if (!user) {
    return next(new ErrorHandler("Please Login First", 403));
  }

  req.user = user;
  next();
});

module.exports = auth;
