import api from '../utils/axios';

// login 比较特殊 只能这么写
export const login = (email, password) =>
  api(`/login`, { method: 'POST', data: { email, password } });

// path variable 参考这个
export const resetPasswordemail = (email) =>
  api(`/v1/users/reset-password/${email}`, { method: 'GET' });
