import * as Action from '../actionTypes';

const initialState = {
  isOpen: false,
  content: 'login',
};

// eslint-disable-next-line default-param-last
const signReducer = (state = initialState, { type }) => {
  switch (type) {
    case Action.OPEN_SIGN_DIALOG:
      return {
        isOpen: true,
        content: state.content,
      };

    case Action.CLOSE_SIGN_DIALOG:
      return {
        isOpen: false,
        content: state.content,
      };

    case Action.LOGIN_SIGN_DIALOG:
      return {
        isOpen: state.isOpen,
        content: 'login',
      };

    case Action.REGISTER_SIGN_DIALOG:
      return {
        isOpen: state.isOpen,
        content: 'register',
      };

    default:
      return state;
  }
};

export default signReducer;
