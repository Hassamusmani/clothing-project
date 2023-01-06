import { takeLatest, put, call, all } from "redux-saga/effects";
import { auth, createUserProfileDocument, getCurrentUser, googleProvider } from "../../firebase/firebase.utils";
import { resetCart } from "../cart/cart-actions";
import { signInFailure, signInSuccess, signOutFailure, signOutSuccess, signUpFailure, signUpSuccess } from "./user-actions";
import constants from "./user-const";

export function* getSnapshotFromUserAuth (userAuth, additionalData) {
  try {
    const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
    const userSnapShot = yield userRef.get();
    yield put(signInSuccess({ id: userSnapShot.id, ...userSnapShot.data() }));
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithEmail({payload: {email, password}}) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* userSignOut() {
  try {
    yield auth.signOut();
    yield all([put(signOutSuccess()), put(resetCart())]);
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

export function* userSignUp({ payload: { email, password, displayName }}) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield put(signUpSuccess({ user, additionalData: { displayName }}));
  } catch (error) {
    yield put(signUpFailure(error));
  }
}

export function* signInAfterSignUp({ payload: { user, additionalData } }) {
  yield getSnapshotFromUserAuth(user, additionalData);
}

export function* userSaga() {
  yield takeLatest(constants.GOOGLE_SIGN_IN_START, signInWithGoogle);
  yield takeLatest(constants.EMAIL_SIGN_IN_START, signInWithEmail);
  yield takeLatest(constants.CHECK_USER_SESSION, isUserAuthenticated);
  yield takeLatest(constants.SIGN_OUT_START, userSignOut);
  yield takeLatest(constants.SIGN_UP_START, userSignUp);
  yield takeLatest(constants.SIGN_UP_SUCCESS, signInAfterSignUp);
}