const asyncHandler = require("express-async-handler")
const Chat = require("../models/chatModel")
const User = require("../models/userModel")

const getChats = asyncHandler(async(req, res, next) => {
  const {userId} = req.body
  
  if (!userId) {
    throw new Error("send user id")
  }

  let chat = await Chat.find({
    isGroup: false,
    $and : [
      {users: { $elemMatch :{ $eq: req.user._id }}},
      {users: { $elemMatch: { $eq: userId}}}
    ]
  }).populate("users", "-password").populate("latestMessage")
  chat = await User.populate(chat, {
    path :"latestMessage.sender",
    select: "name email"
  })
  
  if (chat.length > 0) {
    res.send(chat[0])
  } else {
    data = {
      chatName: "sender ",
      isGroup: false,
      users: [req.user._id, userId]
    }
    try {
      const createChat = await Chat.create(data)
      res.json({create: createChat})
    } catch (error) {
      res.json({error})
    }
  }
  
})

const fetchChats = asyncHandler(async(req, res, next) => {
  
  let chats = await Chat.find({
    $or : [
      {users: { $elemMatch: { $eq: req.user._id}}},
    ]
  }).populate("users", "-password").populate("latestMessage")

  res.json(chats)
})

const createGroup = asyncHandler(async(req, res, next) => {
  const {users} = req.body
  
  if(users.length < 2){
    throw new Error("At least 2 user compalsary");
  }

  users.push(req.user._id)
  

  const group = await Chat.create({ chatName: req.body.name, isGroup: true, users, admin: req.user._id})

  const fullGroup = await Chat.findById(group._id).populate("users", "-password")
  res.json(fullGroup)
})

const renameGroup = asyncHandler(async(req, res, next) => {
  let {name, groupId} = req.body

  if (!name) {
    throw new Error("send group name")
  }

  const group = await Chat.findByIdAndUpdate( groupId, {chatName: name}, {new: true})
  .populate("users", "-password")

  res.json(group)
})

const addUser = asyncHandler(async(req, res, next) => {
  let {groupId, userId} = req.body

  if(!userId){
    userId = "6598a8c38fa31a8c3b9b6b1d"
    groupId = "659a92b32bac390dc36f28bb"
  }

  const group = await Chat.findByIdAndUpdate({_id: groupId}, {$push: {users: userId}}, {new: true}).populate("users", "-password")
    res.json(group)

})

const removeUser = asyncHandler(async(req, res, next) => {
    let {groupId, userId} = req.body

  if(!userId){
    userId = "6598a8c38fa31a8c3b9b6b1d"
    groupId = "659a92b32bac390dc36f28bb"
  }

  const group = await Chat.findByIdAndUpdate({_id: groupId}, {$pull: {users: userId}}, {new: true}).populate("users", "-password")
    res.json(group)
})

const updateGroup = asyncHandler(async(req, res, next) => {
  let {groupId, users, name} = req.body

  const group = await Chat.findByIdAndUpdate(groupId, {users, chatName: name}, {new: true}).populate("users", "-password")

  res.json(group)
})

module.exports = {
getChats,
  fetchChats,
  createGroup,
  renameGroup,
  addUser,
  removeUser,
  updateGroup
}