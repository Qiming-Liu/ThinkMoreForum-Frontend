/* eslint-disable import/prefer-default-export */
import { GET_POSTS } from '../actionTypes';

const initialState = {
  posts: [],
  post: {},
  loading: false,
  error: null,
};

// eslint-disable-next-line default-param-last
export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
