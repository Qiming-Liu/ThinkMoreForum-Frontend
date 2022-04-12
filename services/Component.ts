import http from '../utils/axios';

interface Footer {
  id: string;
  name: string;
  code: string;
}

export const putComponent = ({ code, id, name }: Footer) =>
  http(`/v1/component/`, { method: 'PUT', data: { code, id, name } });
