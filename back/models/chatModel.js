const mongoose = require("mongoose")

const chatSchema = new mongoose.Schema({
  chatName: {
    type:  String,
    trim: true,
  },
  isGroup: {
    type: Boolean,
    default: false,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  latestMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message"
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
})


const Chat = mongoose.model("Chat", chatSchema)

module.exports = Chat