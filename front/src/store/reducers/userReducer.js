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
  LOGIN_RESET,
  CLEAR_ERRORS,
} from "../constants/userConstant";

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_REQUSET:
    case REGISTER_REQUEST:
    case GET_USER_REQUEST:
      return {
        loading: true,
      };

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        loading: false,
        success: true,
        user: action.payload.user,
      };

    case GET_USER_SUCCESS:
      return {
        loading: false,
        user: action.payload.user,
      };

    case GET_USER_FAILURE:
      return {
        loading: false,
        success: false,
      };

    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };

    case LOGIN_RESET:
      return {
        loading: false,
        success: false,
      };

    case CLEAR_ERRORS:
      return {
        loading: false,
        error: null,
      };

    default:
      return {
        ...state,
        loading: true,
      };
  }
};

export default userReducer;
