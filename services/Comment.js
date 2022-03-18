import http from '../utils/axios';

// eslint-disable-next-line import/prefer-default-export
export const postComment = (requestBody) =>
  http(`/v1/comment`, { method: 'POST', data: requestBody });
