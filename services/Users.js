import http from '../utils/axios';

export const hasOpenid = () => http(`/v1/users/open_id`, { method: 'GET' });

export const passwordReset = (password) =>
  http(`/v1/users/password_reset`, {
    method: 'PUT',
    data: { new_password: password },
  });

export const getUserById = (usersId) =>
  http(`/v1/users/details/${usersId}`, { method: 'GET' });

export const getCurrentUser = () =>
  http(`/v1/users//my_details`, { method: 'GET' });
// changeUsername
// sendVerificationEmail
// changeEmail
// changePassword
