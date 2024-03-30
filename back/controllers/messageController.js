const asyncHandler = require("express-async-handler")
const Message= require("../models/messageModel")
const User = require("../models/userModel")
const Chat = require("../models/chatModel")

const message = asyncHandler( async(req, res, next) => {
  let { chatId } = req.params;
  
  const message = await Message.find({ chat: chatId }).populate("sender", "name email").populate("chat")
  
  res.json({
    message
  })
})

const createMessage = asyncHandler(async(req, res, next) => {
  let {chatId, content} = req.body

  if (!chatId || !content) {
    throw new Error("Please provide chatId and content")
  }

  let message = await Message.create({
    content,
    sender: req.user._id,
    chat: chatId
  })

  message = await message.populate("sender", "name email")
  message = await message.populate("chat");
  message = await User.populate(message, {
    path: "chat.users",
    select: "name email",
  });

  await Chat.findByIdAndUpdate(chatId, {
    latestMessage: message
  },{
    new: true
  })
  
  res.json(message)
})


module.exports = {
  createMessage,
  message,
}