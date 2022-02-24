import * as Action from '../actionTypes';
import { resetPassword } from '../../services/usersServices';

const passwordResetStart = () => ({
  type: Action.PASSWORD_RESET_START,
});

const passwordResetSuccess = (token) => ({
  type: Action.PASSWORD_RESET_SUCCESS,
  payload: token,
});

const passwordResetError = (errorMessage) => ({
  type: Action.PASSWORD_RESET_ERROR,
  payload: errorMessage,
});

export default {
  passwordResetStart,
  passwordResetSuccess,
  passwordResetError,
};

export const passwordAction = (password) => (dispatch) => {
  dispatch(passwordResetStart());
  return resetPassword(password)
    .then((response) =>
      dispatch(passwordResetSuccess(response.headers.authorization)),
    )
    .catch((error) => {
      dispatch(passwordResetError(error.response.data.message));
      console.log(error.response.data.message);
    });
};
