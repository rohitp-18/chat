const User = require("../models/userModel");
const sendToken = require("../utils/sendToken");
const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  /* const data = {
    name: "rohit",
    email: "abc@gmail.com",
    password: "12345678"
  }*/
  if (!name || !email || !password) {
    throw new Error("please fill all the required fields");
  }

  const user = await User.create({ name, email, password });

  sendToken(user, 201, res);
});

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error("please fill all the required fields");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid credentials ");
  }

  const comparePassword = await user.comparePassword(password);
  if (!comparePassword) {
    throw new Error("Invalid paa credentials ");
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
    throw new Error("please login first");
  }

  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      user: req.user,
    });
});

const findUsers = asyncHandler(async (req, res, next) => { 
  let search = req.query.search ? {
    $and: [{
      name: {
        $regex: req.query.search, $options: 'i'
      }
    }]
  }: {
  
  }
  const users = await User.find(search).find({_id: {$ne: req.user._id}})

  res.json(users);
});

module.exports = { registerUser, logoutUser, loginUser, getUser, findUsers };
