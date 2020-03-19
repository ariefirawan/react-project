import { userActionTypes } from './user.types';

export const setCurrentUser = users => ({
  type: userActionTypes.SET_CURRENT_USER,
  payload: users
});

export const googleSignInStart = () => ({
  type: userActionTypes.GOOGLE_SIGN_IN_START
});

export const googleSignInSuccess = user => ({
  type: userActionTypes.GOOGLE_SIGN_IN_SUCCESS,
  payload: user
});

export const googleSignInFail = error => ({
  type: userActionTypes.GOOGLE_SIGN_IN_FAILURE,
  payload: error
});
export const emailSignInStart = emailAndPassword => ({
  type: userActionTypes.EMAIL_SIGN_IN_START,
  payload: emailAndPassword
});

export const emailSignInSuccess = user => ({
  type: userActionTypes.EMAIL_SIGN_IN_SUCCESS,
  payload: user
});

export const emailSignInFail = error => ({
  type: userActionTypes.EMAIL_SIGN_IN_FAILURE,
  payload: error
});
