/* eslint-disable no-console */
import axios from 'axios';
import store from '../store/store';
import { signOut } from '../store/actions';

const getInstance = () => {
  const axiosInstance = axios.create();
  axiosInstance.defaults.baseURL = 'https://api.thinkmoreapp.com';

  axiosInstance.defaults.headers.common.Authorization =
    store.getState().sign.token;

  axiosInstance.interceptors.request.use(
    (config) => {
      console.log(`request:${config.url}`);
      console.log(config);
      return config;
    },
    (error) => {
      console.log(`request error:${error.config.url}`);
      console.log(error.toJSON());
      return Promise.reject(error);
    },
  );

  axiosInstance.interceptors.response.use(
    (config) => {
      console.log(`response:${config.url}`);
      console.log(config);
      return config;
    },
    (error) => {
      console.log(`response error:${error.config.url}`);
      console.log(error.toJSON());
      if (error.response.status === 401) {
        store.dispatch(signOut());
      }
      return Promise.reject(error);
    },
  );
  return axiosInstance;
};

const http = async (endpoint, { method, data, headers, ...customConfig }) => {
  const config = {
    method,
    headers,
    data,
    ...customConfig,
  };
  const axiosInstance = getInstance();
  const response = await axiosInstance(endpoint, { ...config });
  return response;
};

export default http;

//   // await console.log(response);
//   const { authorization } = response.headers;
//   if (authorization.startsWith('Bearer')) {
//     store.dispatch(setJWT(authorization));
//   }
