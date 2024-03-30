import { combineReducers } from "redux";
import reducer from "./userReducer";
import select from "./select"
import notify from "./notify"


const rootReducer = combineReducers({
  login: reducer,
  select,
  notify
});

export default rootReducer;
