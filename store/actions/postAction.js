import { GET_POSTS } from '../actionTypes';

export const fetchPosts = () => async (dispatch) => {
  /* const res = await axios.get(API)
    const data = await res.json() */
  let long_test_text = 'long_test_text ';
  for (let i = 0; i < 8; i++) {
    long_test_text += long_test_text;
  }

  dispatch({
    type: GET_POSTS,
    payload: ['1st post', '2nd post', long_test_text],
    /* payload: data */
  });
};
