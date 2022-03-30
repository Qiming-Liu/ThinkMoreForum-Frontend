import * as Action from '../actionTypes';
import store, { saveState } from '../store';
import { login } from '../../services/Public';

const loginSuccess = (response) => ({
  type: Action.LOGIN_SUCCESS,
  payload: response.data,
});

const loginError = () => ({
  type: Action.LOGIN_ERROR,
});

const loginAction = (email, password, success, fail) => (dispatch) => {
  login(email, password)
    .then((response) => {
      dispatch(loginSuccess(response));
      success(response);
    })
    .catch((error) => {
      dispatch(loginError());
      fail(error);
    })
    .then(() => saveState(store.getState()));
};

export default loginAction;
