import { Stack, Avatar, Box, Modal, IconButton, Input } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  ArrowBack,
  Face6,
  Link,
  Mic,
  PhoneOutlined,
  Search,
  Send,
  VideocamOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
// import io from "socket.io-client";
import Group from "../components/UpdateGroup";
import ChatModel from "../components/chatModel";
import axios from "../store/axios";
import animationData from "../assets/loader.json";
import { addNotify, removeUserChat } from "../store/actions/userAction";
import socket from "../components/socketContext";
import { createNotify, readNotify } from "../store/actions/notifyActions";
import { useMemo } from "react";
import { changeChat } from "../store/actions/chatAction";

// let socket, selectedChat;
const Chat = ({ view }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { chats } = useSelector((state) => state.chats);
  const { chat, users } = useSelector((state) => state.select);
  const { user } = useSelector((state) => state.user);
  const { notify, arr } = useSelector((state) => state.notify);

  const [model, setModel] = useState(false);
  const [userInfo, setUserInfo] = useState(false);
  // const [update, setUpdate] = useState(false);
  const [message, setMessage] = useState([]);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [chatt, setChatt] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [size, setSize] = useState(view === "mobile");

  let messsageArr = [];

  useEffect(() => {
    setSize(view === "mobile");
  }, [view]);

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
    // if (!chat) {
    // }
    // console.log(chat);
    // socket = io("http://localhost:5000/", {
    //   rejectUnauthorized: false,
    // });
    // socket.emit("setup", user);
    // socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", (data) => {
      if (user._id !== data) {
        setIsTyping(true);
        console.log("typing");
      }
    });
    socket.on("stop typing", (data) => {
      if (user._id !== data) {
        setIsTyping(false);
      }
    });

    return () => {
      socket.off("stop typing");
      socket.off("typing");
    };
  }, [chat]);

  useEffect(() => {
    getMessage();
  }, [chat]);

  useEffect(() => {
    socket.on("message received", (data) => {
      if (
        !chat ||
        chat._id !== data.chat._id
        // if chat is not selected or doesn't match current chat
      ) {
        if (chatt) {
          setChatt(true);
          return;
        }
        // dispatch(
        //   createNotify({
        //     id: data.chat._id,
        //     message: data._id,
        //   })
        // );
        console.log(chat);
        if (data.chat.unread.includes(data._id)) return;
        data.chat.unread.push(data._id);
        data.chat.latestMessage = data;
        new Notification(data.content);
        dispatch(changeChat({ chat: data.chat }));
        setChatt(false);
      } else {
        setMessage((mess) => [...mess, data]);
        data.chat.latestMessage = data;
        data.chat.unread = [];
        console.log(data);
        dispatch(readNotify(chat._id));
        dispatch(changeChat({ chat: data.chat }));
      }
    });

    return () => {
      socket.off("message received");
    };
  }, [chat, message, socket]);

  const typingInp = (value) => {
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

      chat.latestMessage = data.message;
      setMessage((mess) => [...mess, data.message]);
      dispatch(changeChat({ chat }));

      socket.emit("new message", data.message);
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
        <section className=" w-full min-w-[320px] m-[unset]">
          <Box
            style={{
              width: size ? "100%" : "-webkit-fill-available",
            }}
            className="bg-white fixed z-[1] top-0 py-2 px-2 xl:px-3 flex justify-between items-center"
          >
            <div className="flex items-center">
              <IconButton
                sx={{ display: size ? "block" : "none", p: "2px" }}
                onClick={() => dispatch(removeUserChat())}
              >
                <ArrowBack sx={{ color: "#000" }} />
              </IconButton>
              <Avatar />
              <h1 className="font-size-xl pl-1 xl:pl-2 font-bold">
                {chat.isGroup
                  ? chat.chatName
                  : chat.users[0]._id === user._id
                  ? chat.users[1].name
                  : chat.users[0].name}
              </h1>
            </div>
            <div className="flex xl:gap-[20px] xl:px-4">
              <IconButton>
                <VideocamOutlined />
              </IconButton>
              <IconButton>
                <PhoneOutlined />
              </IconButton>
              <IconButton>
                <Search />
              </IconButton>
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
            style={{
              width: "-webkit-fill-available",
              boxShadow: "none",
              borderRadius: 0,
            }}
            className="fixed flex bottom-0 bg-transparent"
            onSubmit={(e) => sendMessage(e)}
          >
            {/* {isTyping ? (
              // <div>
              //   <Lottie
              //     options={defaultOptions}
              //     height={50}
              //     width={70}
              //     style={{ marginBottom: 15, marginLeft: 0 }}
              //   />
              // </div>
            ) : (
              <></>
            )} */}
            <Input
              value={messageInput}
              spellCheck
              startAdornment={
                <>
                  {size && messageInput?.length < 1 && (
                    <>
                      <IconButton>
                        <Link
                          fontSize="small"
                          sx={{
                            transform: "rotate(90deg)",
                            ml: size ? "2px" : "5px",
                          }}
                        />
                      </IconButton>
                      <IconButton>
                        <Face6
                          fontSize="small"
                          sx={{ mx: size ? "2px" : "5px" }}
                        />
                      </IconButton>
                    </>
                  )}
                </>
              }
              endAdornment={
                messageInput?.length >= 1 ? (
                  <IconButton type="submit">
                    <Send fontSize="small" sx={{ mx: size ? "2px" : "5px" }} />
                  </IconButton>
                ) : (
                  <IconButton>
                    <Mic fontSize="small" sx={{ mx: size ? "2px" : "5px" }} />
                  </IconButton>
                )
              }
              type="text"
              onChange={(e) => typingInp(e.target.value)}
              autoFocus
              fullWidth
              sx={{
                mx: "auto",
                bgcolor: "#fff",
                padding: "4px",
                margin: "4px",
                boxShadow: "0px 0px 5px #aaa",
                borderRadius: "8px",
              }}
              disableUnderline
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
