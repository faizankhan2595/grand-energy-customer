const initialState = {
    stafUser: [],
    customerUser: [],
    groupUser: [],
    activeChat: [],
  };
  
  const chatReduce = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_STAFF':
        return { ...state, stafUser: action.payload };
      case 'SET_CUSTOMER':
        return { ...state, customerUser: action.payload };
      case 'SET_GROUP':
        return { ...state, groupUser: action.payload };
      case 'SET_ACTIVE_CHAT':
        return { ...state, activeChat: action.payload };
      default:
        return state;
    }
  };
  
  export default chatReduce;
  