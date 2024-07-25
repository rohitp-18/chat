import { combineReducers } from "redux";
import reducer from "./userReducer";
import select from "./select";
import notify from "./notify";
import { allChatsReducer, searchReducer } from "./chatReducer";

const rootReducer = combineReducers({
  user: reducer,
  search: searchReducer,
  chats: allChatsReducer,
  select,
  notify,
});

export default rootReducer;
