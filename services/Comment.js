import http from '../utils/axios';

export const getCommentByPost = (postId) =>
  http(`/v1/comment?post_id=${postId}`, { method: 'GET' });
