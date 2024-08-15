const expressAsyncHandler = require("express-async-handler");
const Notify = require("../models/notificationModel");

const getAllNotify = expressAsyncHandler(async (req, res, next) => {
  const notify = await Notify.find({ user: req.user });

  res.status(200).json({
    success: true,
    notify,
  });
});

const createNotify = expressAsyncHandler(async (req, res, next) => {
  const { chat, count } = req.body;

  const notify = await Notify.create({ chat, count, user: req.user });

  res.status(200).json({
    success: true,
    notify,
    count,
  });
});

const updateNotify = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { count } = req.body;

  const notify = await Notify.findOneAndUpdate({ _id: id }, { count });

  res.status(200).json({
    success: true,
    notify,
    message: "Notification updated successfully",
  });
});

const deleteNotify = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const notify = await Notify.findOneAndDelete({ _id: id });

  res.status(200).json({
    success: true,
    notify,
    message: "Notification deleted successfully",
  });
});

const sendRequest = expressAsyncHandler(async (req, res, next) => {
  const { chat, user, message } = req.body;

  const notify = await Notify.create({
    chat,
    user,
    message,
    reqUser: req.user,
  });

  res.status(200).json({
    success: true,
    notify,
  });
});

const acceptRequest = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const notify = await Notify.findById(id).populate("chat");

  notify.chat.request = true;
  notify.accepted = true;

  const notify2 = Notify.create({ user: notify.reqUser, accepted: true });

  await notify.save();
  res.status(200).json({
    success: true,
    message: "Chat requiest accepted successfully",
    notify,
  });
});

const deniedRequest = expressAsyncHandler(async (req, res, next) => {
  const notify = await Notify.findByIdAndUpdate(req.params.id, {
    accepted: false,
  });

  Notify.create({ user: notify.reqUser, chat: notify.chat });

  res.status(200).json({
    success: true,
    message: "Chat requiest canceled successfully",
    notify,
  });
});

module.exports = {
  getAllNotify,
  createNotify,
  updateNotify,
  deleteNotify,

  sendRequest,
  acceptRequest,
  deniedRequest,
};
