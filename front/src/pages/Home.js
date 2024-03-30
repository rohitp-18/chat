import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
//import { styled, alpha } from "@mui/material/styles";
import Notify from "./notify";
import { useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Stack, Avatar, Box, Modal, InputBase } from "@mui/material";
import SearchAppBar from "../components/Header";
//import SearchIcon from "@mui/icons-material/Search";
import Chats from "./Chat";

import {
  getUserAction,
  addUserChat,
  removeUserChat,
} from "../store/actions/userAction";
import axios from "../store/axios";
import Group from "../components/Group";

const Home = () => {
  const nevigate = useNavigate();
  const { user } = useSelector((state) => state.login);
  const userChat = useSelector((state) => state.select);
  const notify = useSelector((state) => state.notify);
  const [search, setSearch] = useState(false);
  const [group, setGroup] = useState(false);
  const [searchValue, setSearchValue] = useState([]);
  const [searchInp, setSearchInp] = useState("");
  const [allUser, setAllUser] = useState([]);
  //const [notify, setNotify] = useState([])

  const dispatch = useDispatch();

  useEffect(() => {
    let token = JSON.parse(localStorage.getItem("token"));

    if (!token) {
      nevigate("/login");
      return;
    }

    dispatch(getUserAction());
    dispatch(removeUserChat());

    axios.get("/chats").then((res) => {
      setAllUser(res.data);
    });

    //;
  }, [dispatch, nevigate]);

  const findUser = async (e) => {
    setSearchInp(e.target.value);
    let res = await axios
      .get(`/user/find?search=${e.target.value}`)
      .then((res) => {
        setSearchValue(res.data);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    console.log(allUser.length);
  }, [notify, userChat, allUser]);

  const chatOpen = (item) => {
    dispatch(addUserChat(item));
    //nevigate("/chat");
  };

  return (
    <>
      {!user ? (
        <div>loading....</div>
      ) : user && userChat.user._id ? (
        <Chats />
      ) : (
        <div>
          <SearchAppBar />
          <div className="flex justify-between items-center">
            <div className=" px-2 font-semibold text-xl">Chats</div>
            <div
              className="m-2 p-1 rounded-full text-sm border-grey-200 bg-grey-300 border-2 border-black"
              onClick={() => setGroup(true)}
            >
              + create group
            </div>
          </div>
          {group && <Group group={group} setGroup={setGroup} />}
          <div>
            {allUser.length < 1 ? (
              <div>less yhan one</div>
            ) : (
              allUser.map((item) => {
                return (
                  <div
                    onClick={() => chatOpen(item)}
                    key={item._id}
                    className="w-full flex hover:text-white hover:bg-blue-200 font-bold p-2 w-full justify-between"
                  >
                    <div className="flex items-center w-full">
                      <div className="">
                        <Avatar />
                      </div>
                      <div className="px-2 font-size-md">
                        {item.isGroup
                          ? item.chatName
                          : item.users[0]._id === user.user._id
                          ? item.users[1].name
                          : item.users[0].name}
                      </div>
                    </div>
                    <div className="">{/*<MoreVertIcon />*/}</div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
