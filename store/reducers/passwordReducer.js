import * as Action from '../actionTypes';

const initialState = {
  isLoading: false,
};

// eslint-disable-next-line default-param-last
const passwordReducer = (state = initialState, { type }) => {
  switch (type) {
    case Action.EMAIL_START:
      return {
        ...state,
        isLoading: true,
      };

    case Action.EMAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default passwordReducer;
