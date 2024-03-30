const express = require("express")

const {getChats, fetchChats, createGroup, renameGroup, addUser, removeUser, updateGroup} = require("../controllers/chatController")
const auth = require("../middlewares/auth")

const router = express.Router()

router.use(auth)
router.get("/", fetchChats)
router.post("/", getChats)
router.post("/create", createGroup)
router.put("/rename", renameGroup)
router.put("/adduser", addUser)
router.get("/removeuser", removeUser)
router.get("/update", updateGroup)
module.exports = router