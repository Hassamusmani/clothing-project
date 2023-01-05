const INITIAL_STATE = {
  shopData: null
};

const shopReducer = (state = INITIAL_STATE, action) => {
  const { payload } = action;
  switch(action.type) {
    case 'UPDATE_COLLECTIONS':
      return {
        ...state,
        shopData: payload
      }
    default:
      return state;
  }
}

export default shopReducer;