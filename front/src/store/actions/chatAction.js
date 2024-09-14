import {
  CHANGE_CHAT_REQUEST,
  CLEAR_ERRORS,
  CREATE_GROUP_FAIL,
  CREATE_GROUP_REQUSET,
  CREATE_GROUP_SUCCESS,
  GET_ALL_CHATS_FAIL,
  GET_ALL_CHATS_REQUEST,
  GET_ALL_CHATS_SUCCESS,
  GET_CHAT_FAIL,
  GET_CHAT_REQUEST,
  GET_CHAT_SUCCESS,
} from "../constants/chatConstant";
import axios from "../axios";

const getAllChats = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_CHATS_REQUEST });

    const { data } = await axios.get("/chats");

    dispatch({ type: GET_ALL_CHATS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ALL_CHATS_FAIL, error: error.response.data.messsage });
  }
};

const getChats = (word) => async (dispatch) => {
  try {
    dispatch({ type: GET_CHAT_REQUEST });

    const { data } = await axios.get(`/user/find?search=${word}`);

    dispatch({ type: GET_CHAT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_CHAT_FAIL, error: error.response.data.messsage });
  }
};

const createGroup = (info) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_GROUP_REQUSET });

    const { data } = await axios.post("/chats/create", info);

    dispatch({ type: CREATE_GROUP_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_GROUP_FAIL, error: error.response.data.messsage });
  }
};

const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

const changeChat = (data) => async (dispatch) => {
  dispatch({ type: CHANGE_CHAT_REQUEST, payload: data });
};

export { getAllChats, getChats, createGroup, clearErrors, changeChat };
