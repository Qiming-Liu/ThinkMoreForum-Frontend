import http from '../utils/axios';

export const hasOpenid = () => http(`/v1/users/openid`, { method: 'GET' });

export const passwordReset = (password) =>
  http(`/v1/users/password-reset`, {
    method: 'PUT',
    data: { new_password: password },
  });

export const getMyUser = () => http(`/v1/users/my-details`, { method: 'GET' });

export const getUserById = (usersId) =>
  http(`/v1/users/details/${usersId}`, { method: 'GET' });

export const getCurrentUser = () =>
  http(`/v1/users/my-details`, { method: 'GET' });

export const changePassword = (oldPassword, newPassword) =>
  http(`/v1/users/password`, {
    method: 'PUT',
    data: {
      oldPassword,
      newPassword,
    },
  });

export const changeUsername = (newUsername) =>
  http(`/v1/users/username/${newUsername}`, { method: 'PUT' });

export const changeEmail = (newEmail) =>
  http(`/v1/users/email/${newEmail}`, { method: 'PUT' });

export const sendVerificationEmail = (newEmail) =>
  http(`/v1/users/email/${newEmail}`, { method: 'GET' });
