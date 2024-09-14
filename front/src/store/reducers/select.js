const select = (state = {}, action) => {
  switch (action.type) {
    case "addUserChat":
      return {
        ...state,
        chat: action.payload,
      };

    case "removeUserChat":
      return {
        ...state,
        chat: action.payload,
      };

    case "socket-add":
      return { ...state, socket: action.payload };

    case "chat-connect":
      return { ...state, users: Array.from(action.payload) };

    default:
      return { ...state };
  }
};

export default select;
