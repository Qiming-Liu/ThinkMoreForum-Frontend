import * as Action from '../actionTypes';
import store, { saveState } from '../store';
import { login } from '../../services/Users';

const loginSuccess = () => ({
  type: Action.LOGIN_SUCCESS,
});

const loginError = () => ({
  type: Action.LOGIN_ERROR,
});

const loginAction = (email, password, success, fail) => (dispatch) => {
  login(email, password)
    .then((response) => {
      dispatch(loginSuccess());
      success(response);
    })
    .catch((error) => {
      dispatch(loginError());
      fail(error);
    })
    .then(() => saveState(store.getState()));
};

export default loginAction;
