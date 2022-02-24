import axios from 'axios';
import store from '../store/store';
import { setJWTAction, logoutAction } from '../store/actions/signAction';

<<<<<<< Updated upstream
const getInstance = () => {
  const axiosInstance = axios.create();
  axiosInstance.defaults.baseURL = 'https://api.thinkmoreapp.com';
=======
const axiosInstance = axios.create({
  baseURL: 'http://localhost:443',
});
>>>>>>> Stashed changes

  axiosInstance.defaults.headers.common.Authorization =
    store.getState().sign.token || '';

  axiosInstance.interceptors.response.use(
    (config) => {
      // update jwt
      const { authorization } = config.headers;
      if (authorization && authorization.startsWith('Bearer')) {
        store.dispatch(setJWTAction(authorization));
      }

      return config;
    },
    (error) => {
      // jwt expired
      if (error && error.response.status === 401) {
        store.dispatch(logoutAction());
      }
      return Promise.reject(error);
    },
  );
  return axiosInstance;
};

const http = (endpoint, { method, data, headers, ...customConfig }) => {
  const config = {
    method,
    headers,
    data,
    ...customConfig,
  };

  const axiosInstance = getInstance();
  return axiosInstance(endpoint, { ...config });
};

export default http;
