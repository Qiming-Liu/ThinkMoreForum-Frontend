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

export default {
  loginStart,
  loginSuccess,
  loginError,
  loginOut,
};

// TODO get token from headers
export const loginAction = (email, password) => (dispatch) => {
  dispatch(loginStart());
  login(email, password)
    .then((response) => dispatch(loginSuccess(response.headers)))
    .catch((error) => dispatch(loginSuccess(error.message)));
};

export const logoutAction = () => (dispatch) => {
  dispatch(loginOut());
};
