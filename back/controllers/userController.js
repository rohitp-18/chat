const expressAsyncHandler = require("express-async-handler");
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

  if (!user) {
    return next(new ErrorHandler("Internal error", 500));
  }

  sendToken(user, 200, res);
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

  sendToken(user, 200, res);
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

const getAllNotifyController = expressAsyncHandler(async (req, res, next) => {
  const notification = await User.findById(req.user._id);

  res.status(200).json({
    success: true,
    notification: notification.notification,
  });
});

const createNotifyController = expressAsyncHandler(async (req, res, next) => {
  const { user, messageId, chatId } = req.body;
  console.log("users");

  const notification = await User.findByIdAndUpdate(user, {
    notification: {
      $push: {
        count: {
          $push: messageId,
        },
        chat: chatId,
      },
    },
  });

  notification.notification.push({ chat: chatId, count: [messageId] });
  await notification.save();

  res.status(200).json({
    success: true,
    notification: notification.notification,
  });
});

const deleteNotifyController = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const notification = await User.findById(req.user._id);

  notification.notification.filter((n) => n._id !== id);
  await notification.save();

  res.status(200).json({
    success: true,
    message: "notification deleted successfully",
    notification: notification.notification,
  });
});

const updateNotifyController = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(req.user._id);

  user.notification.map((n) => {
    if (n._id === id) {
      n.isRead = true;
    }
    return n;
  });

  await user.save();

  res.status(200).json({
    success: true,
    notification: user.notification,
  });
});

module.exports = {
  registerUser,
  logoutUser,
  loginUser,
  getUser,
  findUsers,
  getAllNotifyController,
  createNotifyController,
  deleteNotifyController,
  updateNotifyController,
};
