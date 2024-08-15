const { default: axios } = require("../axios");
const {
  GET_ALL_NOTIFY_REQUEST,
  GET_ALL_NOTIFY_FAIL,
  GET_ALL_NOTIFY_SUCCESS,
  CREATE_NOTIFY_REQUEST,
  CREATE_NOTIFY_SUCCESS,
  CREATE_NOTIFY_FAIL,
  UPDATE_NOTIFY_REQUEST,
  UPDATE_NOTIFY_SUCCESS,
  UPDATE_NOTIFY_FAIL,
  DELETE_NOTIFY_REQUEST,
  DELETE_NOTIFY_SUCCESS,
  DELETE_NOTIFY_FAIL,
  SEND_CHAT_REQUEST,
  SEND_CHAT_SUCCESS,
  SEND_CHAT_FAIL,
  ACCEPT_CHAT_REQUEST,
  ACCEPT_CHAT_FAIL,
  ACCEPT_CHAT_SUCCESS,
  DENIED_CHAT_REQUEST,
  DENIED_CHAT_SUCCESS,
  DENIED_CHAT_FAIL,
} = require("../constants/notifyConstants");

const getAllNotify = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_NOTIFY_REQUEST });

    const { data } = await axios.get("/notify/");

    dispatch({ type: GET_ALL_NOTIFY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_NOTIFY_FAIL,
      payload: error.response.data.message,
    });
  }
};

const createNotify = (form) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_NOTIFY_REQUEST });

    const { data } = await axios.post("/notify/new", form);

    dispatch({ type: CREATE_NOTIFY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_NOTIFY_FAIL,
      payload: error.response.data.message,
    });
  }
};

const updateNotify = (id, form) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_NOTIFY_REQUEST });

    const { data } = await axios.put(`/notify/n/${id}`, form);

    dispatch({ type: UPDATE_NOTIFY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_NOTIFY_FAIL,
      payload: error.response.data.message,
    });
  }
};

const deleteNotify = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_NOTIFY_REQUEST });

    const { data } = await axios.delete(`/notify/n/${id}`);

    dispatch({ type: DELETE_NOTIFY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_NOTIFY_FAIL,
      payload: error.response.data.message,
    });
  }
};

const sendRequest = (form) => async (dispatch) => {
  try {
    dispatch({ type: SEND_CHAT_REQUEST });

    const { data } = await axios.post("/notify/req", form);

    dispatch({ type: SEND_CHAT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SEND_CHAT_FAIL, payload: error.response.data.message });
  }
};

const acceptRequest = (id) => async (dispatch) => {
  try {
    dispatch({ type: ACCEPT_CHAT_REQUEST });

    const { data } = await axios.put(`/notify/req/${id}`);

    dispatch({ type: ACCEPT_CHAT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ACCEPT_CHAT_FAIL, payload: error.response.data.message });
  }
};

const deniedRequest = (id) => async (dispatch) => {
  try {
    dispatch({ type: DENIED_CHAT_REQUEST });

    const { data } = await axios.put(`/notify/req/${id}`);

    dispatch({ type: DENIED_CHAT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DENIED_CHAT_FAIL, payload: error.response.data.message });
  }
};

module.exports = {
  getAllNotify,
  createNotify,
  updateNotify,
  deleteNotify,

  sendRequest,
  acceptRequest,
  deniedRequest,
};
