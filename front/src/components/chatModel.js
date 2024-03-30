import { Avatar } from "@mui/material";
import {
  isSameSender,
  isSameUser,
  isLastMessage,
  isSameSenderMargin,
} from "../store/logics";
import ScrollableFeed from "react-scrollable-feed";
import ScrollToBottom, { useScrollToBottom } from "react-scroll-to-bottom"


const chatModel = ({ user, message }) => {
  const scroll= () => {
    window.scrollTo(0, document.body.scrollHeight)
  }
  return (
    <>
      <div onLoad={() =>scroll()} className="my-4">
      {message &&
        message.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(message, m, i, user._id) ||
              isLastMessage(message, i, user._id)) && (
                <Avatar />
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(message, m, i, user._id),
                marginTop: isSameUser(message, m, i, user._id) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default chatModel;
