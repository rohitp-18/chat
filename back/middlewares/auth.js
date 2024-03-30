const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const auth = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    throw new Error("please login first");
  }

  const { _id } = jwt.verify(token, process.env.JWT_SECRET);

  if (!_id) {
    throw new Error("plaase login first");
  }

  const user = await User.findById(_id);

  if (!user) {
    throw new Error("please login uaer first");
  }

  req.user = user;
  next();
});

module.exports = auth;
