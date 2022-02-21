import axios from 'axios';
import store from '../store/store';

const axiosInstance = axios.create({
  baseURL: 'http://3.26.60.225:8080',
});

const api = async (endpoint, { method, data, headers, ...customConfig }) => {
  const config = {
    method,
    headers: {
      Authorization: store.getState().jwt.token,
      ...headers,
    },
    data,
    ...customConfig,
  };
  const response = await axiosInstance(endpoint, { ...config });

  return response;
};

export default api;
