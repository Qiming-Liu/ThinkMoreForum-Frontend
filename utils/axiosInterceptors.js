import axios from 'axios';

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.token;
    config.headers.Authorization = token;

    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (error) => {
    if (error && error.response && error.response.status) {
      switch (error.response.status) {
        case 401:
          console.log(401);
          break;
        case 404:
          console.log(404);
          break;
        default:
          console.log(200);
          break;
      }
    } else {
    }
  },
);
