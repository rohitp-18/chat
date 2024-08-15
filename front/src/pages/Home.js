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
import NavDrawer from "../components/drawer";

const Home = () => {
  // const nevigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { chat } = useSelector((state) => state.select);
  // const { chats, loading } = useSelector((state) => state.chats);
  // const notify = useSelector((state) => state.notify);

  const [navTab, setNavTab] = useState(false);
  const [open, setOpen] = useState(false);
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
          <main
            style={{ overflowY: "hidden" }}
            className="laptop lg:flex w-[100%] bg-[#eee] pl-[60px] h-[100vh]"
          >
            <NavDrawer setOpen={setOpen} open={open} />
            <section
              style={{ borderRight: "1px soid #efefef" }}
              className="bg-white px-2 rounded w-[450px]"
            >
              <AllChats />
            </section>
            {chat ? <Chats view={"laptop"} /> : <About view={"laptop"} />}
          </main>
          <main
            style={{ overflowY: "hidden" }}
            className="tablet display-none w-[100%] bg-[#eee] h-[100vh]"
          >
            {navTab && <NavDrawer open={navTab} setOpen={setNavTab} />}
            <section
              style={{ borderRight: "1px soid #efefef" }}
              className="bg-white px-2 rounded w-[250px]"
            >
              <AllChats setNavTab={setNavTab} view={"tablet"} />
            </section>
            <Chats view={"tablet"} />
            {/* {chat ? <Chats view={"tablet"} /> : <AllChats view={"mobile"} />} */}
          </main>
          <main
            style={{ overflowY: "hidden" }}
            className="mobile display-none  w-[100%] bg-[#eee] h-[100vh]"
          >
            {chat ? <Chats view={"mobile"} /> : <AllChats view={"mobile"} />}
          </main>
        </>
      )}
    </>
  );
};

export default Home;
