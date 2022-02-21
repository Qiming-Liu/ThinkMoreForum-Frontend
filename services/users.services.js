import api from '../api';

// eslint-disable-next-line import/prefer-default-export
export const resetPasswordemail = (email) =>
  api(`v1/users/reset-password/${email}`, { method: 'GET' });
