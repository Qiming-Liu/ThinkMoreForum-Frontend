import * as Action from '../actionTypes';

const initialState = {
  isOpen: false,
  content: 'login',
  isLoading: false,
  isLogin: false,
  token: undefined,
  errorMessage: undefined,
};

// eslint-disable-next-line default-param-last
const signReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Action.OPEN_SIGN_DIALOG:
      return {
        ...state,
        isOpen: true,
        isLoading: false,
      };

    case Action.CLOSE_SIGN_DIALOG:
      return {
        ...state,
        isOpen: false,
        isLoading: false,
      };

    case Action.LOGIN_SIGN_DIALOG:
      return {
        ...state,
        content: 'login',
      };

    case Action.REGISTER_SIGN_DIALOG:
      return {
        ...state,
        content: 'register',
      };

    case Action.LOGIN_START:
      return {
        ...state,
        isLoading: true,
      };

    case Action.LOGIN_SUCCESS:
      return {
        ...state,
        isOpen: false,
        isLoading: false,
        token: payload,
        isLogin: true,
      };

    case Action.LOGIN_ERROR:
      return {
        ...state,
        isLoading: false,
        isLogin: false,
        errorMessage: payload,
      };

    case Action.SET_JWT:
      return {
        ...state,
        token: payload,
      };

    case Action.LOGOUT:
      return initialState;

    default:
      return state;
  }
};

export default signReducer;
