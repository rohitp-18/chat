import { Stack, Avatar, Box, Modal } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import io from "socket.io-client";
import Group from "../components/UpdateGroup";
import ChatModel from "../components/chatModel";
import axios from "../store/axios";
import animationData from "../assets/loader.json";
import { addNotify } from "../store/actions/userAction";

let socket, selectedChat;
const Chat = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.select);
  const { user: me } = useSelector((state) => state.login);
  const notify = useSelector((state) => state.notify);
  const [model, setModel] = useState(false);
  const [userInfo, setUserInfo] = useState(false);
  const [update, setUpdate] = useState(false);
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
      const { data } = await axios.get(`/message/${user._id}`);

      setMessage(data.message);
      socket.emit("chat-join", user._id);
    } catch (error) {}
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    socket = io("http://localhost:5000/", {
      rejectUnauthorized: false,
    });
    socket.emit("setup", me.user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", (data) => {
      if (me.user._id !== data) {
        setIsTyping(true);
      }
    });
    socket.on("stop typing", (data) => {
      if (me.user._id !== data) {
        setIsTyping(false);
      }
    });
  }, [user]);

  useEffect(() => {
    getMessage();
  });

  useEffect(() => {
    /*socket.on("message received", (data) => {
      if (
        !user._id || // if chat is not selected or doesn't match current chat
        user._id !== data.chat._id
      ) {
        dispatch(addNotify(data));
        if (notify.includes(data)) {
        }
      } else {
        setMessage([...message, data]);
      }
    });*/
  });

  const typingInp = (value) => {
    if (!socketConnected) {
      return;
    }

    if (!typing) {
      setTyping(true);
      socket.emit("typing", { user: user._id, me: me.user._id });
    }
    setMessageInput(value);

    var lastType = new Date().getTime();
    setTimeout(() => {
      var newTime = new Date().getTime();

      if (newTime - lastType >= 4000) {
        socket.emit("stop typing", { user: user._id, me: me.user._id });
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

    socket.emit("stop typing", { user: user._id, me: me.user._id });
    try {
      const { data } = await axios.post("/message/", {
        content: messageInput,
        chatId: user._id,
      });

      socket.emit("new message", data);
      setMessage([...message, data]);
    } catch (error) {}
  };

  return (
    <>
      {user && (
        <>
          <Box className="bg-blue-600 py-2 px-2 flex justify-between items-center">
            <div className="flex items-center text-white">
              <Avatar />
              <h1 className="font-size-xl pl-2 font-bold">
                {user.isGroup
                  ? user.chatName
                  : user.users[0]._id === me.user._id
                  ? user.users[1].name
                  : user.users[0].name}{" "}
              </h1>
            </div>
            <div>
              <VisibilityIcon onClick={() => setUserInfo(true)} />
            </div>
          </Box>
          {user && user.isGroup && userInfo ? (
            <Modal open={userInfo} onClose={() => setUserInfo(false)}>
              <Box className=" mx-auto py-2 mt-20 border-0 outline-0 max-w-[300px] bg-white flex flex-col justify-center items-center">
                {model ? (
                  <Group
                    open={model}
                    setModel={() => setModel(false)}
                    group={user}
                    you={me}
                  />
                ) : (
                  <div>
                    <div className="font-size-xl font-bold">Group Info</div>
                    <div className="flex">
                      {user.users &&
                        user.users.map((user) => {
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

          {message && <ChatModel user={me.user} message={message} />}

          <form
            className="fixed bottom-30px mb-[40px]"
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
              className="w-full mx-2 p-2 outline-0 rounded mb-4"
              placeholder="Enter your message"
            />
            <button type="submit" className="w-0 h-0"></button>
          </form>
        </>
      )}
    </>
  );
};

export default Chat;
