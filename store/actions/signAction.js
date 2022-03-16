import { signOut } from 'next-auth/react';
import * as Action from '../actionTypes';
import store, { saveState } from '../store';

export const openSignDialog = () => ({
  type: Action.OPEN_SIGN_DIALOG,
});

export const closeSignDialog = () => ({
  type: Action.CLOSE_SIGN_DIALOG,
});

export const loginSignDialog = () => ({
  type: Action.LOGIN_SIGN_DIALOG,
});

export const registerSignDialog = () => ({
  type: Action.REGISTER_SIGN_DIALOG,
});

const setJWT = (token) => ({
  type: Action.SET_JWT,
  payload: token,
});

const setOpenID = (openid) => ({
  type: Action.SET_OPENID,
  payload: openid,
});

const setDetail = (myDetails) => ({
  type: Action.SET_DETAIL,
  payload: myDetails,
});

const setHeadImg = (headImgUrl) => ({
  type: Action.SET_HEADIMG,
  payload: headImgUrl,
});

const setUsername = (username) => ({
  type: Action.SET_USERNAME,
  payload: username,
});

const setEmail = (email) => ({
  type: Action.SET_EMAIL,
  payload: email,
});

export const setJWTAction = (token) => (dispatch) => {
  dispatch(setJWT(token));
};

export const setOpenIDAction = (openid) => (dispatch) => {
  dispatch(setOpenID(openid));
};

export const setDetailAction = (myDetails) => (dispatch) => {
  dispatch(setDetail(myDetails));
};

export const setHeadImgAction = (headImgUrl) => (dispatch) => {
  dispatch(setHeadImg(headImgUrl));
};

export const setUsernameAction = (username) => (dispatch) => {
  dispatch(setUsername(username));
};

export const setEmailAction = (email) => (dispatch) => {
  dispatch(setEmail(email));
};

const loginOut = () => ({
  type: Action.LOGOUT,
});

export const logoutAction = () => (dispatch) => {
  signOut({ redirect: false });
  dispatch(loginOut());
  saveState(store.getState());
};
