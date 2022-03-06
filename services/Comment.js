import http from '../utils/axios';

export const getPostCommentsByPostId = (postId) =>
  http(`/v1/comment/${postId}`, { method: 'GET' });
