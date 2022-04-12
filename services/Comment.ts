import http from '../utils/axios';

export const postComment = (requestBody: any) =>
  http(`/v1/comment`, { method: 'POST', data: requestBody });
