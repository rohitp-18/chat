const express = require("express");

const router = express.Router();

const {
  registerUser,
  getUser,
  logoutUser,
  loginUser,
  findUsers,
  getAllNotifyController,
  createNotifyController,
  updateNotifyController,
  deleteNotifyController,
} = require("../controllers/userController");
const auth = require("../middlewares/auth");

router.get("/getuser", auth, getUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", auth, logoutUser);
router.get("/find", auth, findUsers);

router.get("/notify/", auth, getAllNotifyController);
router.post("/notify/", auth, createNotifyController);
router
  .route("/notify/:id")
  .put(auth, updateNotifyController)
  .delete(auth, deleteNotifyController);

module.exports = router;
