import { Avatar, Divider } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

function AboutChat() {
  const { chat } = useSelector((state) => state.select);
  const { user } = useSelector((state) => state.user);

  return (
    <>
      {chat && (
        <>
          <section className="min-w-[300px]">
            <div
              style={{ flexDirection: "column" }}
              className="flex justify-center items-center"
            >
              <Avatar sx={{ width: "80px", height: "80px" }} />
              <h2 className="pt-3 text-[25px] font-bold">
                {chat.isGroup
                  ? chat.chatName
                  : chat.users[0]._id === user._id
                  ? chat.users[1].name
                  : chat.users[0].name}
              </h2>
              <span className="text-sm pb-5">
                {chat.isGroup
                  ? ""
                  : chat.users[0]._id === user._id
                  ? chat.users[1].email
                  : chat.users[0].email}
              </span>
            </div>
            <Divider />
          </section>
        </>
      )}
    </>
  );
}

export default AboutChat;
