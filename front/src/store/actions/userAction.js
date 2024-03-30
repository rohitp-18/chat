import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_REQUSET,
  GET_USER_FAILURE,
  GET_USER_SUCCESS,
  GET_USER_REQUEST,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
  REGISTER_REQUEST,
} from "../constants/userConstant";
import axios from "../axios";

const loginRequest =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      dispatch({ type: LOGIN_REQUSET });

      const { data } = await axios.post("/user/login", { email, password });
      if (!data.token) {
        dispatch({ type: LOGIN_FAILURE, payload: "invalid credentials" });
      }
      localStorage.setItem("token", JSON.stringify(data.token));

      dispatch({ type: LOGIN_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: LOGIN_FAILURE, payload: error.message });
    }
  };

const getUserAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_REQUEST });

    const { data } = await axios.get("/user/getuser", {
      withCredentials: true,
    });
    localStorage.setItem("token", JSON.stringify(data.token));

    dispatch({ type: GET_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_USER_FAILURE, payload: error.message });
  }
};

const registerRequest = (user) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });

    const { data } = await axios.post("/user/register", user);
    localStorage.setItem("token", JSON.stringify(data.token));

    dispatch({ type: REGISTER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: REGISTER_FAILURE, payload: error.message });
  }
};

const addUserChat = (user) => async (dispatch) => {
  dispatch({ type: "addUserChat", payload: user });
};

const removeUserChat = () => async (dispatch) => {
  dispatch({ type: "removeUserChat", payload: {} });
};

const addNotify = (notify) => async (dispatch) => {
  dispatch({ type: "addNotify", payload: notify });
};

const removeNotify = (notify) => async (dispatch) => {
  dispatch({ type: "removeNotify", payload: notify });
};

export {
  getUserAction,
  loginRequest,
  registerRequest,
  removeUserChat,
  addUserChat,
  addNotify,
  removeNotify,
};
