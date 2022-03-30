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

const setHeadImg = (headImgUrl) => ({
  type: Action.SET_HEADIMG,
  payload: headImgUrl,
});

const setProfileImg = (profileImgUrl) => ({
  type: Action.SET_PROFILEHEADING,
  payload: profileImgUrl,
});

const setUsername = (username) => ({
  type: Action.SET_USERNAME,
  payload: username,
});

const setEmail = (email) => ({
  type: Action.SET_EMAIL,
  payload: email,
});

const setFooter = (footer) => ({
  type: Action.SET_FOOTER,
  payload: footer,
});

export const setJWTAction = (token) => (dispatch) => {
  dispatch(setJWT(token));
};

export const setOpenIDAction = (openid) => (dispatch) => {
  dispatch(setOpenID(openid));
  saveState(store.getState());
};

export const setHeadImgAction = (headImgUrl) => (dispatch) => {
  dispatch(setHeadImg(headImgUrl));
  saveState(store.getState());
};

export const setProfileImgAction = (profileImgUrl) => (dispatch) => {
  dispatch(setProfileImg(profileImgUrl));
  saveState(store.getState());
};

export const setUsernameAction = (username) => (dispatch) => {
  dispatch(setUsername(username));
  saveState(store.getState());
};

export const setEmailAction = (email) => (dispatch) => {
  dispatch(setEmail(email));
  saveState(store.getState());
};

export const setFooterAction = (footer) => (dispatch) => {
  dispatch(setFooter(footer));
  saveState(store.getState());
};

export const logoutAction = () => (dispatch) => {
  signOut({ redirect: false });
  dispatch({
    type: Action.LOGOUT,
  });
  saveState(store.getState());
};
