import { constants } from "./shop-const";

export const fetchCollectionStart = () => ({
  type: constants.FETCH_COLLECTION_START,
});

export const fetchCollectionSuccess = collectionsMap => ({
  type: constants.FETCH_COLLECTION_SUCCESS,
  payload: collectionsMap
});

export const fetchCollectionFailure = () => ({
  type: constants.FETCH_COLLECTION_FAILURE,
});
