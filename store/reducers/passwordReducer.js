import { EMAIL_FOUND, EMAIL_ERROR } from '../actionTypes';

const initialState = {
  isFound: false,
  errorMessage: null,
};

// eslint-disable-next-line default-param-last
const passwordReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case EMAIL_FOUND:
      return {
        ...state,
        isFound: payload,
      };

    case EMAIL_ERROR:
      return {
        ...state,
        errorMessage: payload,
      };

    default:
      return state;
  }
};

export default passwordReducer;
