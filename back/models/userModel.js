const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    validator: validator.isEmail,
    unique: [true, "Email already exists"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
  },
  notification: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require,
      },
      type: {
        type: String,
        default: "message",
      },
      chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "chat",
      },
      content: {
        type: String,
      },
      isRead: {
        type: Boolean,
        default: false,
      },
      count: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "message",
        },
      ],
    },
  ],
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
