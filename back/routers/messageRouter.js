const express = require("express")
const {
  createMessage,
  message,
} = require("../controllers/messageController")
const auth = require("../middlewares/auth")

const router = express.Router();


router.use(auth)
router.post("/", createMessage)
router.get("/:chatId", message)

module.exports = router;