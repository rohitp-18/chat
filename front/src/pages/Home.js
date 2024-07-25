import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
// import Notify from "./notify";
// import { useNavigate } from "react-router-dom";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import { Stack, Avatar, Box, Modal, InputBase } from "@mui/material";
import Header from "../components/Header";
import Chats from "./Chat";

// import {
//   getUserAction,
//   addUserChat,
//   removeUserChat,
// } from "../store/actions/userAction";
// import Group from "../components/Group";
import { getAllChats, getChats } from "../store/actions/chatAction";
import AllChats from "../components/allChats";
import About from "../components/About";
import AboutChat from "../components/AboutChat";

const Home = () => {
  // const nevigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { chat } = useSelector((state) => state.select);
  // const { chats, loading } = useSelector((state) => state.chats);
  // const notify = useSelector((state) => state.notify);

  // const [search, setSearch] = useState(false);
  // const [group, setGroup] = useState(false);
  // const [searchValue, setSearchValue] = useState([]);
  // const [searchInp, setSearchInp] = useState("");
  // const [allUser, setAllUser] = useState([]);
  //const [notify, setNotify] = useState([])

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllChats());
  }, [dispatch]);

  // const findUser = async (e) => {
  //   dispatch(getChats(e.target.value));
  // };

  // useEffect(() => {
  //   console.log(allUser.length);
  // }, [notify, userChat, allUser]);

  return (
    <>
      {user && (
        <>
          {/* <Header /> */}
          <main
            style={{ overflowY: "hidden" }}
            className="flex pt-[64px] h-[100vh] justify-between"
          >
            <AllChats />
            {chat ? (
              <>
                <Chats />
                <AboutChat />
              </>
            ) : (
              <>
                <About />
              </>
            )}
          </main>
        </>
      )}
    </>
  );
};

export default Home;
