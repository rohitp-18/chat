import { Avatar, IconButton, Input, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Group from "./Group";
import { useDispatch, useSelector } from "react-redux";
import { addUserChat } from "../store/actions/userAction";
import { Add, Check, Search } from "@mui/icons-material";
import Menu from "@mui/icons-material/Menu";
import { Badge } from "@mui/base";

function AllChats({ view, setNavTab }) {
  const [group, setGroup] = useState(false);
  const [search, setSearch] = useState();

  const [size, setSize] = useState(view === "mobile");

  useEffect(() => {
    setSize(view === "mobile");
  }, [view]);

  const { chats, loading } = useSelector((state) => state.chats);
  const { chat } = useSelector((state) => state.select);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const chatOpen = (item) => {
    dispatch(addUserChat(item));
  };
  return (
    <div className="sm:w-full">
      <div className="flex pt-3 md:pt-[36px] pb-4 justify-between items-center">
        {view === "tablet" && (
          <IconButton
            onClick={() => setNavTab(true)}
            sx={{ position: "fixed" }}
            className="top-3 left-3"
          >
            <Menu />
          </IconButton>
        )}
        <div className="px-2 font-bold text-xl">Chats</div>
        <IconButton>
          <Add />
        </IconButton>
        {/* </div> */}
      </div>

      <Input
        size="small"
        disableUnderline
        sx={{ width: "calc(100% - 16px)", mx: "8px" }}
        className="bg-stone-300 rounded-md px-3 py-1 mb-3"
        startAdornment={<Search fontSize="24px" className="mr-2" />}
        value={search}
        placeholder="search here..."
        onChange={(e) => setSearch(e.target.value)}
        type="search"
      />

      {group && <Group group={group} setGroup={setGroup} />}
      {!chats ? (
        <div>less yhan one</div>
      ) : (
        chats.map((item) => (
          <div
            onClick={() => chatOpen(item)}
            key={item._id}
            style={{ backgroundColor: item._id === chat?._id && "#efefef" }}
            className="flex items-center text-stone-700 hover:text-stone-900 rounded-lg hover:bg-stone-100  p-2 justify-between"
          >
            <div className="flex items-center w-full">
              <Avatar sx={{}} />

              <div className="px-2 h-[39px] flex flex-col ">
                <span
                  style={{
                    lineHeight: 1,
                    fontWeight: "bold",
                    fontSize: "17px",
                  }}
                >
                  {item.isGroup
                    ? item.chatName
                    : item.users[0]._id === user._id
                    ? item.users[1].name
                    : item.users[0].name}
                </span>
                {item.latestMessage && (
                  <p
                    style={{ textOverflow: "ellipsis" }}
                    className="text-[13px] h-[22px] overflow-hidden font-[400]"
                  >
                    {item.latestMessage.sender === user._id ? (
                      <>
                        <Check
                          fontSize="small"
                          sx={{ opacity: 0.6 }}
                          color={item.latestMessage.read ? "success" : "unset"}
                        />
                        {item.latestMessage.content}
                      </>
                    ) : (
                      item.latestMessage.content
                    )}
                  </p>
                )}
              </div>
            </div>
            <div className="">
              {item.unread && !chat ? (
                item.latestMessage.sender !== user._id &&
                item.unread.length !== 0 ? (
                  <p className="text-[#fff] px-1 flex items-center justify-center text-xs bg-black rounded-full min-w-[18px] min-h-[18px]">
                    {item.unread.length}
                  </p>
                ) : (
                  <></>
                )
              ) : (
                chat._id != item._id && <></>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default AllChats;
