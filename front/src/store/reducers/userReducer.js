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

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_REQUSET:
    case REGISTER_REQUEST:
    case GET_USER_REQUEST:
      return { loading: true };

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
    case GET_USER_SUCCESS:
      return { loading: false, user: action.payload };

    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
    case GET_USER_FAILURE:
      return { loading: false, error: action.payload };

    default:
      return { ...state, loading: false };
  }
};

export default userReducer;
