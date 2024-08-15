const mongoose = require("mongoose");

const notifySchema = new mongoose.Schema(
  {
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },

    message: {
      type: String,
    },

    count: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],

    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },

    createdAt: {
      type: Date,
      default: new Date(Date.now()),
    },

    accepted: {
      type: Boolean,
    },

    reqUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    visited: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Notify = mongoose.model("Notify", notifySchema);

module.exports = Notify;
