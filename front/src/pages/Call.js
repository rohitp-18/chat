import React, { useEffect, useState } from "react";
import VideoCall from "../components/videoCall";
import NavDrawer from "../components/drawer";
import AllChats from "../components/allChats";
import { useDispatch, useSelector } from "react-redux";
import { getAllChats } from "../store/actions/chatAction";

function Call() {
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
            <VideoCall view={"laptop"} />
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
            <VideoCall view={"tablet"} />
            {/* {chat ? <Chats view={"tablet"} /> : <AllChats view={"mobile"} />} */}
          </main>
          <main
            style={{ overflowY: "hidden" }}
            className="mobile display-none  w-[100%] bg-[#eee] h-[100vh]"
          >
            {chat ? (
              <VideoCall view={"mobile"} />
            ) : (
              <AllChats view={"mobile"} />
            )}
          </main>
        </>
      )}
    </>
  );
}

export default Call;
