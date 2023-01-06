import constants from "./user-const";

const INITIAL_STATE = {
  currentUser: null,
  error: null
}

const userReducer = (state = INITIAL_STATE, action) => {
  const { payload } = action;
  switch (action.type) {
    case constants.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: payload,
        error: null
      }
    case constants.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        error: null
      }
    case constants.SIGN_IN_FAILURE:
    case constants.SIGN_OUT_FAILURE:
    case constants.SIGN_UP_FAILURE:
      return {
        ...state,
        error: payload
      }
    default:
      return state;
  }
}

export default userReducer;