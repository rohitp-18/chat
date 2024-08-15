import { Avatar } from "@mui/material";
import {
  isSameSender,
  isSameUser,
  isLastMessage,
  isSameSenderMargin,
} from "../store/logics";
import { useEffect, useRef } from "react";

const ChatModel = ({ user, message }) => {
  const span = useRef();
  const div = useRef();
  const spans = useRef(null);

  useEffect(() => {
    // span.current && div.current.scroll(0, div.current.offsetHeight);
    div.current.scrollIntoView(false);
    // eslint-disable-next-line
  }, [span.current]);
  return (
    <>
      <div
        className="pt-[60px] px-3 full-height-chat"
        style={{ scrollbarWidth: "thin", overflowY: "auto" }}
      >
        <div ref={div}>
          {message &&
            message.map((m, i) => (
              <div
                style={{ display: "flex", alignItems: "center" }}
                key={m._id}
              >
                {(isSameSender(message, m, i, user._id) ||
                  isLastMessage(message, i, user._id)) && (
                  <Avatar
                    className="z-0"
                    sx={{ width: "30px", height: "30px" }}
                  />
                )}
                <span
                  style={{
                    backgroundColor: `${
                      m.sender._id === user._id ? "#d8fdd2" : "#fff" // "#BEE3F8" : "#cbe7b4"
                    }`,
                    marginLeft: isSameSenderMargin(message, m, i, user._id),
                    marginTop: isSameUser(message, m, i, user._id) ? 3 : 10,
                    borderRadius: "20px",
                    padding: "5px 15px",
                    maxWidth: "75%",
                  }}
                  ref={i === message.length - 1 ? span : spans}
                >
                  {m.content}
                </span>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default ChatModel;
