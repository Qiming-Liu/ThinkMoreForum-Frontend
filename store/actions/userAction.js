import { EMAIL_ERROR, EMAIL_FOUND } from '../actionTypes';
import { resetPasswordemail } from '../../services/users.services';

const emailFound = (isFound) => ({
  type: EMAIL_FOUND,
  payload: isFound,
});

const emailError = (errorMessage) => ({
  type: EMAIL_ERROR,
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
