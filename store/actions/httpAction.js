import * as Action from '../actionTypes';
import store, { saveState } from '../store';
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

// eslint-disable-next-line import/prefer-default-export
const loginAction = (email, password) => (dispatch) => {
  dispatch(loginStart());
  login(email, password)
    .then((response) => dispatch(loginSuccess(response.headers.authorization)))
    .catch((error) => dispatch(loginError(error)))
    .then(() => saveState(store.getState()));
};

export default loginAction;
