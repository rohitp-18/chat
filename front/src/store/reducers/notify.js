

const notify = (state = [], action) => {
  switch (action.type) {
    case "addNotify":
      return [action.payload]

    case "removeNotify":
      return [action.payload]

    default :
      return state
  }
}

export default notify