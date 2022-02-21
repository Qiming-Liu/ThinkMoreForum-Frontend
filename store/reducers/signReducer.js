import * as Action from '../actionTypes';

const initialState = {
  isOpen: false,
  content: 'login',
};

// eslint-disable-next-line default-param-last
const signReducer = (state = initialState, { type }) => {
  switch (type) {
    case Action.SET_SIGN_DIALOG_OPEN:
      return {
        isOpen: true,
        content: state.content,
      };

    case Action.SET_SIGN_DIALOG_CLOSE:
      return {
        isOpen: false,
        content: state.content,
      };

    case Action.SET_SIGN_DIALOG_LOGIN:
      return {
        isOpen: state.isOpen,
        content: 'login',
      };

    case Action.SET_SIGN_DIALOG_REGISTER:
      return {
        isOpen: state.isOpen,
        content: 'register',
      };

    default:
      return state;
  }
};

export default signReducer;
