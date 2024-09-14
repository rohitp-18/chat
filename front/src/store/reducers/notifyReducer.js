import {
  ACCEPT_CHAT_FAIL,
  ACCEPT_CHAT_REQUEST,
  ACCEPT_CHAT_RESET,
  ACCEPT_CHAT_SUCCESS,
  CLEAR_ERRORS,
  CREATE_NOTIFY_FAIL,
  CREATE_NOTIFY_REQUEST,
  CREATE_NOTIFY_SUCCESS,
  READ_NOTIFY_FAIL,
  READ_NOTIFY_REQUEST,
  READ_NOTIFY_RESET,
  READ_NOTIFY_SUCCESS,
  DENIED_CHAT_FAIL,
  DENIED_CHAT_REQUEST,
  DENIED_CHAT_RESET,
  DENIED_CHAT_SUCCESS,
  GET_ALL_NOTIFY_FAIL,
  GET_ALL_NOTIFY_REQUEST,
  GET_ALL_NOTIFY_SUCCESS,
  SEND_CHAT_FAIL,
  SEND_CHAT_REQUEST,
  SEND_CHAT_RESET,
  SEND_CHAT_SUCCESS,
  UPDATE_NOTIFY_FAIL,
  UPDATE_NOTIFY_REQUEST,
  UPDATE_NOTIFY_SUCCESS,
} from "../constants/notifyConstants";

const notifyReducer = (state, action) => {
  switch (action.type) {
    case GET_ALL_NOTIFY_REQUEST:
    case CREATE_NOTIFY_REQUEST:
    case UPDATE_NOTIFY_REQUEST:
    case READ_NOTIFY_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_ALL_NOTIFY_SUCCESS:
      let arr = [];
      action.payload.notification.map((n) => n.count.map((m) => arr.push(m)));
      return {
        ...state,
        loading: false,
        notify: action.payload.notification,
        arr,
      };

    case CREATE_NOTIFY_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case UPDATE_NOTIFY_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case READ_NOTIFY_SUCCESS:
      return {
        ...state,
        loading: false,
        READd: action.payload.success,
        message: action.payload.message,
      };

    case GET_ALL_NOTIFY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CREATE_NOTIFY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_NOTIFY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case READ_NOTIFY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case READ_NOTIFY_RESET:
      return {
        ...state,
        loading: false,
        READd: false,
        message: null,
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
      };
  }
};

const requestChat = (state, action) => {
  switch (action.type) {
    case SEND_CHAT_REQUEST:
    case ACCEPT_CHAT_REQUEST:
    case DENIED_CHAT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case SEND_CHAT_SUCCESS:
      return {
        ...state,
        loading: false,
        sended: action.payload.success,
        message: action.payload.message,
      };

    case DENIED_CHAT_SUCCESS:
      return {
        ...state,
        loading: false,
        denied: action.payload.success,
        message: action.payload.message,
      };

    case ACCEPT_CHAT_SUCCESS:
      return {
        ...state,
        loading: false,
        accepted: action.payload.success,
        message: action.payload.message,
      };

    case SEND_CHAT_FAIL:
      return {
        ...state,
        loading: false,
        sended: false,
        error: action.payload,
      };

    case ACCEPT_CHAT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        accepted: false,
      };

    case DENIED_CHAT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        denied: false,
      };

    case SEND_CHAT_RESET:
      return {
        ...state,
        loading: false,
        sended: false,
        message: null,
      };

    case ACCEPT_CHAT_RESET:
      return {
        ...state,
        loading: false,
        accepted: false,
        message: null,
      };

    case DENIED_CHAT_RESET:
      return {
        ...state,
        loading: false,
        denied: false,
        message: null,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        message: null,
      };

    default:
      return {
        ...state,
      };
  }
};

export { notifyReducer, requestChat };
