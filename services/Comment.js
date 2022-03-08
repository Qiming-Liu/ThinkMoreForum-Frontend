import http from '../utils/axios';

export const getPostCommentsByPostId = (postId) =>
  http(`/v1/comment/${postId}`, { method: 'GET' }); // 这个好像是public的吧

export const createComment = (requestBody) =>
  http(`/v1/comment`, { method: 'POST', data: requestBody });
