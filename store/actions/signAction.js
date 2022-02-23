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

export const setJWTAction = (token) => (dispatch) => {
  dispatch(setJWT());
};

const loginOut = () => ({
  type: Action.LOGOUT,
});

export const logoutAction = () => (dispatch) => {
  dispatch(loginOut());
  saveState(store.getState());
};
