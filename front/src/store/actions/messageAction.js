import axios from "../axios";
import {
  GET_MESSAGES_FAIL,
  GET_MESSAGES_REQUEST,
  GET_MESSAGES_SUCCESS,
} from "../constants/messageConstant";

const getMessage = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_MESSAGES_REQUEST });

    const { data } = await axios.get(`/message/${id}`);

    dispatch({ type: GET_MESSAGES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_MESSAGES_FAIL, payload: error.response.data.message });
  }
};

// const createMessage = ()
