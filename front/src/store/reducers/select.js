

const select= (state= {} , action) => {
  switch (action.type){
    case "addUserChat":
      return {
        user: action.payload
      }

    case "removeUserChat":
      return {
        user: action.payload
      }

    default:
      return state;
  }
}

export default select;