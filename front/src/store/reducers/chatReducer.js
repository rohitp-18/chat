import {
  CHANGE_CHAT_REQUEST,
  CLEAR_ERRORS,
  GET_ALL_CHATS_FAIL,
  GET_ALL_CHATS_REQUEST,
  GET_ALL_CHATS_SUCCESS,
  GET_CHAT_FAIL,
  GET_CHAT_REQUEST,
  GET_CHAT_SUCCESS,
} from "../constants/chatConstant";
import { CREATE_NOTIFY_SUCCESS } from "../constants/notifyConstants";

const searchReducer = (state, action) => {
  switch (action.type) {
    case GET_CHAT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_CHAT_SUCCESS:
      return {
        ...state,
        loading: false,
        search: action.payload.users,
      };

    case GET_CHAT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    default:
      return {
        ...state,
        loading: false,
      };
  }
};

const allChatsReducer = (state, action) => {
  switch (action.type) {
    case GET_ALL_CHATS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_ALL_CHATS_SUCCESS:
      return {
        ...state,
        loading: false,
        chats: action.payload.chats,
      };

    case CREATE_NOTIFY_SUCCESS:
      state.chats[
        state.chats.findIndex((chat) => chat._id === action.payload.chat._id)
      ] = action.payload.chat;
      return state;

    case CHANGE_CHAT_REQUEST:
      state.chats[
        state.chats.findIndex((chat) => chat._id === action.payload.chat._id)
      ] = action.payload.chat;
      return state;

    case GET_ALL_CHATS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    default:
      return {
        ...state,
        loading: false,
      };
  }
};

export { searchReducer, allChatsReducer };
