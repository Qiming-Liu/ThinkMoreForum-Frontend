import axios from 'axios';
import store from '../store/store';
import { setJWTAction, logoutAction } from '../store/actions/signAction';

const backendHttpInstance = () => {
  const axiosInstance = axios.create();
  axiosInstance.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

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
      error && console.log(error.response);

      // jwt expired or invalid
      if (
        error &&
        error.response &&
        (error.response.status === 401 || error.response.status === 405)
      ) {
        store.dispatch(logoutAction());
        return '';
      }

      return Promise.reject(error);
    },
  );
  return axiosInstance;
};

const http = (endpoint, config) => {
  const axiosInstance = backendHttpInstance();
  return axiosInstance(endpoint, { ...config });
};

export const nextapi = (endpoint, config) => {
  const axiosInstance = axios.create();
  return axiosInstance(endpoint, { ...config });
};

export default http;
