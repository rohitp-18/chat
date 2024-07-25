const User = require("../models/userModel");
const ErrorHandler = require("../utils/ErrorHandler");
const sendToken = require("../utils/sendToken");
const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new ErrorHandler("Please fill all required fields", 400));
  }

  const user = await User.create({ name, email, password });
});

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("please fill all the required fields", 400));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new ErrorHandler("Invalid Email and Password", 402));
  }

  const comparePassword = await user.comparePassword(password);

  if (!comparePassword) {
    return next(new ErrorHandler("Invalid Email and Password", 402));
  }

  sendToken(user, 200, res);
});

const getUser = asyncHandler(async (req, res, next) => {
  const user = req.user;

  res.json({
    success: true,
    user,
  });
});

const logoutUser = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please Login again", 400));
  }

  res.clearCookie("token").json({
    success: true,
    user: req.user,
  });
});

const findUsers = asyncHandler(async (req, res, next) => {
  let search = req.query.search
    ? {
        $and: [
          {
            name: {
              $regex: req.query.search,
              $options: "i",
            },
          },
        ],
      }
    : {};
  const users = await User.find(search).find({ _id: { $ne: req.user._id } });

  res.json(users);
});

module.exports = { registerUser, logoutUser, loginUser, getUser, findUsers };
