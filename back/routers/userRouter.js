const express = require("express");

const router = express.Router();

const {
  registerUser,
  getUser,
  logoutUser,
  loginUser,
  findUsers
} = require("../controllers/userController");
const auth = require("../middlewares/auth");

router.get("/getuser", auth, getUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", auth, logoutUser);
router.get("/find", auth, findUsers)

module.exports = router;
