import * as Action from '../actionTypes';

const initialState = {
  isOpen: false,
  content: 'login',
  isLogin: false,
  token: undefined,
  openid: undefined,
};

// eslint-disable-next-line default-param-last
const signReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Action.OPEN_SIGN_DIALOG:
      return {
        ...state,
        isOpen: true,
      };

    case Action.CLOSE_SIGN_DIALOG:
      return {
        ...state,
        isOpen: false,
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

    case Action.LOGIN_SUCCESS:
      return {
        ...state,
        isOpen: false,
        isLogin: true,
      };

    case Action.LOGIN_ERROR:
      return {
        ...state,
        isLogin: false,
      };

    case Action.SET_JWT:
      return {
        ...state,
        token: payload,
      };

    case Action.SET_OPENID:
      return {
        ...state,
        openid: payload,
      };

    case Action.LOGOUT:
      return initialState;

    default:
      return state;
  }
};

export default signReducer;
