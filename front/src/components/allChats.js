import { Avatar } from "@mui/material";
import React, { useState } from "react";
import Group from "./Group";
import { useDispatch, useSelector } from "react-redux";
import { addUserChat } from "../store/actions/userAction";

function AllChats() {
  const [group, setGroup] = useState(false);

  const { chats, loading } = useSelector((state) => state.chats);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const chatOpen = (item) => {
    dispatch(addUserChat(item));
  };
  return (
    <div>
      <div className="flex min-w-[320px] justify-between items-center">
        <div className=" px-2 font-semibold text-xl">Chats</div>
        <div
          className="m-2 p-1 rounded-full text-sm border-grey-200 bg-grey-300 border-2 border-black"
          onClick={() => setGroup(true)}
        >
          + create group
        </div>
      </div>
      {group && <Group group={group} setGroup={setGroup} />}
      {!chats ? (
        <div>less yhan one</div>
      ) : (
        chats.map((item) => (
          <div
            onClick={() => chatOpen(item)}
            key={item._id}
            className=" flex hover:text-white hover:bg-blue-200 font-bold p-2 justify-between"
          >
            <div className="flex items-center w-full">
              <div className="">
                <Avatar />
              </div>
              <div className="px-2 font-size-md">
                {item.isGroup
                  ? item.chatName
                  : item.users[0]._id === user._id
                  ? item.users[1].name
                  : item.users[0].name}
              </div>
            </div>
            <div className="">{/*<MoreVertIcon />*/}</div>
          </div>
        ))
      )}
    </div>
  );
}

export default AllChats;
