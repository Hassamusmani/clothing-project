import { call, put, takeLatest } from "redux-saga/effects";
import { convertSnapshotToMap, firestore } from "../../firebase/firebase.utils";

import { constants } from "./shop-const";
import { fetchCollectionFailure, fetchCollectionSuccess } from "./shop.actions";

export function* fetchCollection() {
  try {
    const collectionRef = firestore.collection("collections");
    const snapShot = yield collectionRef.get();
    const collectionMap = yield call(convertSnapshotToMap, snapShot);
    yield put(fetchCollectionSuccess(collectionMap));
  } catch (error) {
    yield put(fetchCollectionFailure());
  }
}

export function* shopSaga() {
  yield takeLatest(constants.FETCH_COLLECTION_START, fetchCollection);
}