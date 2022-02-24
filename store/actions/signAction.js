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
  dispatch(setJWT(token));
};

<<<<<<< Updated upstream
const loginOut = () => ({
  type: Action.LOGOUT,
});
=======
export const loginAction = (email, password) => (dispatch) => {
  dispatch(loginStart());
  login(email, password)
    .then((response) => dispatch(loginSuccess(response.headers.authorization)))
    .catch((error) => dispatch(loginError(error.message)));
};
>>>>>>> Stashed changes

export const logoutAction = () => (dispatch) => {
  dispatch(loginOut());
  saveState(store.getState());
};
