import axios from 'axios';
import store from '../store/store';

const axiosInstance = axios.create({
  baseURL: 'https://api.thinkmoreapp.com',
});

const api = async (endpoint, { method, data, headers, ...customConfig }) => {
  const config = {
    method,
    headers: {
      Authorization: store.getState().sign.token,
      ...headers,
    },
    data,
    ...customConfig,
  };
  const response = await axiosInstance(endpoint, { ...config });
  return response;
};

export default api;
