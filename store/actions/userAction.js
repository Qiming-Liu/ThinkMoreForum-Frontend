import * as Action from '../actionTypes';
import { resetPasswordemail } from '../../services/usersServices';

const emailFound = (isFound) => ({
  type: Action.EMAIL_FOUND,
  payload: isFound,
});

const emailError = (errorMessage) => ({
  type: Action.EMAIL_ERROR,
  payload: errorMessage,
});

export default {
  emailFound,
  emailError,
};

export const checkEmail = (email) => (dispatch) => {
  resetPasswordemail(email)
    .then((response) => dispatch(emailFound(response.data)))
    .catch((error) => dispatch(emailError(error.response.data.message)));
};
