import * as Action from '../actionTypes';
import store, { saveState } from '../store';
import { Dispatch } from 'redux';

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

const setJWT = (token: string) => ({
  type: Action.SET_JWT,
  payload: token,
});

const setHeadImg = (headImgUrl: string) => ({
  type: Action.SET_HEADIMG,
  payload: headImgUrl,
});

const setProfileImg = (profileImgUrl: string) => ({
  type: Action.SET_PROFILEHEADING,
  payload: profileImgUrl,
});

const setUsername = (username: string) => ({
  type: Action.SET_USERNAME,
  payload: username,
});

const setEmail = (email: string) => ({
  type: Action.SET_EMAIL,
  payload: email,
});

const setFooter = (footer: any) => ({
  type: Action.SET_FOOTER,
  payload: footer,
});

export const setJWTAction = (token: string) => (dispatch: any) => {
  dispatch(setJWT(token));
};

export const setHeadImgAction =
  (headImgUrl: string) => (dispatch: Dispatch) => {
    dispatch(setHeadImg(headImgUrl));
    saveState(store.getState());
  };

export const setProfileImgAction =
  (profileImgUrl: string) => (dispatch: Dispatch) => {
    dispatch(setProfileImg(profileImgUrl));
    saveState(store.getState());
  };

export const setUsernameAction = (username: string) => (dispatch: Dispatch) => {
  dispatch(setUsername(username));
  saveState(store.getState());
};

export const setEmailAction = (email: string) => (dispatch: Dispatch) => {
  dispatch(setEmail(email));
  saveState(store.getState());
};

export const setFooterAction = (footer: any) => (dispatch: Dispatch) => {
  dispatch(setFooter(footer));
  saveState(store.getState());
};

export const logoutAction = () => (dispatch: Dispatch) => {
  dispatch({
    type: Action.LOGOUT,
  });
  saveState(store.getState());
};
