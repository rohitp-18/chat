import { Stack, Avatar, Box, Modal, IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { ArrowBack, Visibility } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import io from "socket.io-client";
import Group from "../components/UpdateGroup";
import ChatModel from "../components/chatModel";
import axios from "../store/axios";
import animationData from "../assets/loader.json";
import { addNotify, removeUserChat } from "../store/actions/userAction";

let socket, selectedChat;
const Chat = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { chat } = useSelector((state) => state.select);
  const { user } = useSelector((state) => state.user);
  const notify = useSelector((state) => state.notify);
  const [model, setModel] = useState(false);
  const [userInfo, setUserInfo] = useState(false);
  // const [update, setUpdate] = useState(false);
  const [message, setMessage] = useState([]);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const [messageInput, setMessageInput] = useState("");

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const getMessage = async () => {
    try {
      const { data } = await axios.get(`/message/${chat._id}`);

      setMessage(data.message);
      socket.emit("chat-join", chat._id);
    } catch (error) {}
  };

  useEffect(() => {
    if (!chat) {
      navigate("/");
    }
    socket = io("http://localhost:5000/", {
      rejectUnauthorized: false,
    });
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", (data) => {
      if (user._id !== data) {
        setIsTyping(true);
      }
    });
    socket.on("stop typing", (data) => {
      if (user._id !== data) {
        setIsTyping(false);
      }
    });
  }, [chat]);

  useEffect(() => {
    getMessage();
  });

  useEffect(() => {
    socket.on("message received", (data) => {
      if (
        !chat._id || // if chat is not selected or doesn't match current chat
        chat._id !== data.chat._id
      ) {
        dispatch(addNotify(data));
        if (notify.includes(data)) {
        }
      } else {
        setMessage([...message, data]);
      }
    });
  });

  const typingInp = (value) => {
    if (!socketConnected) {
      return;
    }

    if (!typing) {
      setTyping(true);
      socket.emit("typing", { chat: chat._id, user: user._id });
    }
    setMessageInput(value);

    var lastType = new Date().getTime();
    setTimeout(() => {
      var newTime = new Date().getTime();

      if (newTime - lastType >= 4000) {
        socket.emit("stop typing", { chat: chat._id, user: user._id });
        setTyping(false);
      }
    }, 5000);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (messageInput.length <= 0) {
      return;
    }
    setMessageInput("");

    socket.emit("stop typing", { chat: chat._id, user: user._id });
    try {
      const { data } = await axios.post("/message/", {
        content: messageInput,
        chatId: chat._id,
      });

      console.log(data);

      socket.emit("new message", data.message);
      setMessage([...message, data.message]);
    } catch (error) {}
  };

  const keyUp = (e) => {
    e.preventDefault();

    if (e.code === 13) {
      sendMessage(e);
    }
  };

  return (
    <>
      {chat && (
        <section className="min-w-[600px] screen m-[unset]">
          <Box className="bg-blue-600 fixed min-w-[600px] pt-[64px] z-[1] top-0 py-2 px-2 flex justify-between items-center">
            <div className="flex items-center text-white">
              <IconButton onClick={() => dispatch(removeUserChat())}>
                <ArrowBack sx={{ color: "#fff" }} />
              </IconButton>
              <Avatar />
              <h1 className="font-size-xl pl-2 font-bold">
                {chat.isGroup
                  ? chat.chatName
                  : chat.users[0]._id === user._id
                  ? chat.users[1].name
                  : chat.users[0].name}
              </h1>
            </div>
            <div>
              <Visibility onClick={() => setUserInfo(true)} />
            </div>
          </Box>
          {chat && chat.isGroup && userInfo ? (
            <Modal open={userInfo} onClose={() => setUserInfo(false)}>
              <Box className="mx-auto py-2 mt-20 border-0 outline-0 max-w-[300px] bg-white flex flex-col justify-center items-center">
                {model ? (
                  <Group
                    open={model}
                    setModel={() => setModel(false)}
                    group={chat}
                    user={user}
                  />
                ) : (
                  <div>
                    <div className="font-size-xl font-bold">Group Info</div>
                    <div className="flex">
                      {chat.users &&
                        chat.users.map((user) => {
                          return (
                            <div
                              style={{ fontSize: "12px" }}
                              key={user._id}
                              className="p-[3px] text-white mx-1 bg-green-300 rounded"
                            >
                              {user.name} X
                            </div>
                          );
                        })}
                    </div>
                    <button
                      className="p-2 bg-blue-300 text-white rounded"
                      onClick={() => setModel(true)}
                    >
                      Update
                    </button>
                  </div>
                )}
              </Box>
            </Modal>
          ) : (
            <Modal open={userInfo} onClose={() => setUserInfo(false)}>
              <Box className=" mx-auto py-2 mt-20 border-0 outline-0 max-w-[300px] bg-white flex flex-col justify-center items-center">
                <Box className="flex flex-col justify-center items-center">
                  <Avatar />
                  <h1 className="font-bold font-size-xl">hii</h1>
                </Box>
              </Box>
            </Modal>
          )}
          {message && <ChatModel user={user} message={message} />}

          <form
            className="fixed flex screen bottom-0"
            onSubmit={(e) => sendMessage(e)}
          >
            {isTyping ? (
              <div>
                <Lottie
                  options={defaultOptions}
                  // height={50}
                  width={70}
                  style={{ marginBottom: 15, marginLeft: 0 }}
                />
              </div>
            ) : (
              <></>
            )}
            <input
              value={messageInput}
              type="text"
              onChange={(e) => typingInp(e.target.value)}
              className="screen p-2 outline-0 rounded"
              autoFocus
              placeholder="Enter your message"
              onKeyUp={(e) => keyUp(e)}
            />
          </form>
        </section>
      )}
    </>
  );
};

export default Chat;
