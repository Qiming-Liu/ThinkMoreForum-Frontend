/* eslint-disable no-console */
import axios from 'axios';
import store from '../store/store';
import { setJWTAction, logoutAction } from '../store/actions/signAction';
import hotToast from './hotToast';

const getInstance = () => {
  const axiosInstance = axios.create();
  // axiosInstance.defaults.baseURL = 'https://api.thinkmoreapp.com';
  axiosInstance.defaults.baseURL = 'http://localhost:443';

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
      if (error && error.response && error.response.status === 401) {
        hotToast('error', 'Login expired, please login again');
        store.dispatch(logoutAction());
        return '';
      }

      // eslint-disable-next-line no-unused-expressions
      error && console.log(error.response);
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
  console.log(data);
  const axiosInstance = getInstance();
  return axiosInstance(endpoint, { ...config });
};

export default http;
