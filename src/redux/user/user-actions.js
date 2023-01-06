import constants from "./user-const";

export const setCurrentUser = user => ({
  type: constants.SET_CURRENT_USER,
  payload: user
})

export const googleSignInStart = () => ({
  type: constants.GOOGLE_SIGN_IN_START
});

export const emailSignInStart = credentials => ({
  type: constants.EMAIL_SIGN_IN_START,
  payload: credentials
});

export const signInSuccess = user => ({
  type: constants.SIGN_IN_SUCCESS,
  payload: user
});

export const signInFailure = error => ({
  type: constants.SIGN_IN_FAILURE,
  payload: error
});

export const checkUserSession = () => ({
  type: constants.CHECK_USER_SESSION
});

export const signOutStart = () => ({
  type: constants.SIGN_OUT_START,
});

export const signOutSuccess = () => ({
  type: constants.SIGN_OUT_SUCCESS,
});

export const signOutFailure = error => ({
  type: constants.SIGN_OUT_FAILURE,
  payload: error
});

export const signUpStart = userData => ({
  type: constants.SIGN_UP_START,
  payload: userData
});

export const signUpSuccess = ({user, additionalData}) => ({
  type: constants.SIGN_UP_SUCCESS,
  payload: { user, additionalData }
});

export const signUpFailure = error => ({
  type: constants.SIGN_UP_FAILURE,
  payload: error
});