import { constants } from "./shop-const";

const INITIAL_STATE = {
  shopData: null,
  fetchLoading: false,
  fetchLoaded: false
};

const shopReducer = (state = INITIAL_STATE, action) => {
  const { payload } = action;
  switch(action.type) {
    case constants.FETCH_COLLECTION_START:
      return {
        ...state,
        fetchLoading: true,
        fetchLoaded: false
      }
    case constants.FETCH_COLLECTION_SUCCESS:
      return {
        ...state,
        fetchLoading: false,
        fetchLoaded: true,
        shopData: payload
      }
    case constants.FETCH_COLLECTION_FAILURE:
      return {
        ...state,
        fetchLoading: false,
        fetchLoaded: false
      }
    default:
      return state;
  }
}

export default shopReducer;