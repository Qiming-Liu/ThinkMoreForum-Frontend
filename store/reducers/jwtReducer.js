import * as Action from '../actionTypes';

const initialState = {
  isLoading: false,
  login: false,
  token: null,
  errorMessage: null,
};

// eslint-disable-next-line default-param-last
const jwtReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Action.LOGIN_START:
      return {
        ...state,
        isLoading: true,
        login: false,
      };

    case Action.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        login: true,
        token: payload,
      };

    case Action.LOGIN_ERROR:
      return {
        ...state,
        isLoading: false,
        login: false,
        errorMessage: payload,
      };

    case Action.LOGOUT:
      return initialState;

    case Action.SET_JWT:
      return {
        ...state,
        token: payload,
      };

    default:
      return state;
  }
};

export default jwtReducer;
