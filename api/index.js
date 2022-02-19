import axios from 'axios';

const apiUrl =
  process.env.NODE_ENV === 'development' ? 'http://localhost:5566' : '';

const axiosInstance = axios.create({
  baseURL: apiUrl,
});

const api = async (
  endpoint,
  { contentType, method, requestData, token, headers, ...customConfig },
) => {
  const config = {
    method,
    headers: {
      Authorization: token ? `${token}` : '',
      'Content-Type': contentType || 'application/json',
    },
    data: requestData,
    ...customConfig,
  };
  const response = await axiosInstance(endpoint, { ...config });

  return response;
};

export default api;
