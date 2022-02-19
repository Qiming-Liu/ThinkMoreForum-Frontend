import {
  USERS_LOAD_START,
  USERS_LOAD_SUCCESS,
  USERS_LOAD_ERROR,
} from '../actionTypes';
import { getAllUsers } from '../../services/users.service';

const usersLoadStart = () => ({
  type: USERS_LOAD_START,
});

const usersLoadSuccess = (users) => ({
  type: USERS_LOAD_SUCCESS,
  payload: users,
});

const usersLoadError = (errorMessage) => ({
  type: USERS_LOAD_ERROR,
  payload: errorMessage,
});

export default {
  usersLoadStart,
  usersLoadSuccess,
  usersLoadError,
};

export const loadAllUsers = () => (dispatch) => {
  dispatch(usersLoadStart());

  getAllUsers()
    .then((response) => dispatch(usersLoadSuccess(response.data)))
    .catch((error) => dispatch(usersLoadError(error.message)));
};
