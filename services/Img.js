import http from '../utils/axios';

export const upload = (img) =>
  http(`/v1/img/upload`, {
    method: 'POST',
    data: new FormData().append('img', img),
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
