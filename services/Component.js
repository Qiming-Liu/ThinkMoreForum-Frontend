import http from '../utils/axios';

// eslint-disable-next-line import/prefer-default-export
export const putComponent = (requestBody) =>
  http(`/v1/component/`, { method: 'PUT', data: requestBody });
