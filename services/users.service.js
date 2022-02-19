import api from '../api';

// eslint-disable-next-line import/prefer-default-export
export const getAllUsers = () => api('/users', { method: 'GET' });
