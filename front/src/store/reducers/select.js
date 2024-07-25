const select = (state = {}, action) => {
  switch (action.type) {
    case "addUserChat":
      return {
        chat: action.payload,
      };

    case "removeUserChat":
      return {
        chat: action.payload,
      };

    default:
      return { ...state };
  }
};

export default select;
