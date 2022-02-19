import {
  USERS_LOAD_START,
  USERS_LOAD_SUCCESS,
  USERS_LOAD_ERROR,
} from '../actionTypes';

const initialState = {
  isLoading: false,
  users: null,
  errorMessage: null,
};

// eslint-disable-next-line default-param-last
const usersReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USERS_LOAD_START:
      return {
        ...state,
        isLoading: true,
        users: null,
        errorMessage: null,
      };

    case USERS_LOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: payload,
      };

    case USERS_LOAD_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage: payload,
      };

    default:
      return state;
  }
};

export default usersReducer;
