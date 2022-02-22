import * as Action from '../actionTypes';
import { login } from '../../services/usersServices';

const loginStart = () => ({
  type: Action.LOGIN_START,
});

const loginSuccess = (token) => ({
  type: Action.LOGIN_SUCCESS,
  payload: token,
});

const loginError = (errorMessage) => ({
  type: Action.LOGIN_ERROR,
  payload: errorMessage,
});

const loginOut = () => ({
  type: Action.LOGOUT,
});

const setJWT = (token) => ({
  type: Action.SET_JWT,
  payload: token,
});

export default {
  loginStart,
  loginSuccess,
  loginError,
  loginOut,
};

export const loginAction = (email, password) => (dispatch) => {
  dispatch(loginStart());
  login(email, password)
    .then((response) => dispatch(loginSuccess(response.headers.authorization)))
    .catch((error) => dispatch(loginSuccess(error.message)));
};

export const logoutAction = () => (dispatch) => {
  dispatch(loginOut());
};

export const setJWTAction = (token) => (dispatch) => {
  dispatch(setJWT(token));
};
