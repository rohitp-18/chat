import { combineReducers } from "redux";
import reducer from "./userReducer";
import select from "./select";
import { notifyReducer, requestChat } from "./notifyReducer";
import { allChatsReducer, searchReducer } from "./chatReducer";

const rootReducer = combineReducers({
  user: reducer,
  search: searchReducer,
  chats: allChatsReducer,
  select,
  notify: notifyReducer,
  request: requestChat,
});

export default rootReducer;
