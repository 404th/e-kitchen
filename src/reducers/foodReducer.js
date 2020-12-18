

const foodReducer = (state={}, action) => {
  switch( action.type ){
    case "food" :
      return state = { ...state, ...action.payload };
    case "fruits" :
      return state = { ...state, ...action.payload };
    default:
      return state
  }
}

export default foodReducer
