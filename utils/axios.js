import axios from 'axios';
import store from '../store/store';

const axiosInstance = axios.create({
  baseURL: 'https://api.thinkmoreapp.com',
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
  // const jwt = response.headers.authorization;
  // localStorage.setItem('jwt', jwt);
  // localStorage.getItem('jwt')
  return response;
};

export default api;
