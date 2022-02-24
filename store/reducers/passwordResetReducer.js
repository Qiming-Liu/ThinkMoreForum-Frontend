import * as Action from '../actionTypes';

const initialState = {
  isLoading: false,
  isSuccess: false,
  errorMessage: null,
};

// eslint-disable-next-line default-param-last
const passwordResetReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Action.PASSWORD_RESET_START:
      return {
        ...state,
        isLoading: true,
      };

    case Action.PASSWORD_RESET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
      };

    case Action.PASSWORD_RESET_ERROR:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        errorMessage: payload,
      };

    default:
      return state;
  }
};

export default passwordResetReducer;
