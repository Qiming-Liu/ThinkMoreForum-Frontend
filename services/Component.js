import http from '../utils/axios';

// eslint-disable-next-line import/prefer-default-export
export const putComponent = ({ code, id, name }) =>
  http(`/v1/component/`, { method: 'PUT', data: { code, id, name } });
