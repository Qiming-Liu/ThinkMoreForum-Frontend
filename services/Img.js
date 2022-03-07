import http from '../utils/axios';

const upload = (img) => {
  const data = new FormData();
  data.append('img', img);
  return http(`/v1/img/upload`, {
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export default upload;
