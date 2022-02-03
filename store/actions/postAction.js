import { GET_POSTS } from '../actionTypes';

export const fetchPosts = () => async (dispatch) => {
  /* const res = await axios.get(API)
    const data = await res.json() */
  dispatch({
    type: GET_POSTS,
    payload: ['1st post', '2nd post'],
    /* payload: data */
  });
};
