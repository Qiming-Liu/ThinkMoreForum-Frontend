import http from '../utils/axios';

export const login = (email, password) =>
  http(`/login`, { method: 'POST', data: { email, password } });

export const register = (email, username, password) =>
  http(`/v1/users/register/${email}/${username}/${password}`, {
    method: 'POST',
  });

export const thirdpartylogin = (email, username, oauthtype, openid) =>
  http(
    `/v1/users/third-party-login/${email}/${username}/${oauthtype}/${openid}`,
    {
      method: 'POST',
    },
  );

// hasOpenid

export const uniqueEmail = (email) =>
  http(`/v1/users/unique-email/${email}`, { method: 'get' });

export const uniqueUsername = (username) =>
  http(`/v1/users/unique-username/${username}`, { method: 'get' });

export const sendResetPasswordEmail = (email) =>
  http(`/v1/users/reset-password/${email}`, { method: 'GET' });

export const resetPassword = (password) =>
  http(`/v1/users/password-reset/${password}`, { method: 'PUT' });

export const getMyUser = () => http(`/v1/users/my-details`, { method: 'GET' });

export const getUserById = (usersId) =>
  http(`/v1/users/details/${usersId}`, { method: 'GET' });

//changeUsername
//sendVerificationEmail
//changeEmail
//changePassword
