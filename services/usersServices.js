import api from '../utils/axios';

// login 比较特殊 只能这么写
export const login = (email, password) =>
  api(`/login`, { method: 'POST', data: { email, password } });

// path variable 参考这个
export const resetPasswordemail = (email) =>
  api(`/v1/users/reset-password/${email}`, { method: 'GET' });

// 调用:
// import { login } from '../services/usersServices';
// login(email, password);

export const getPostsByCategoryTitle = (
  categoryTitle,
  currentPage,
  sizePerPage,
) =>
  api(`/v1/category/${categoryTitle}`, {
    method: 'GET',
    params: {
      page: currentPage,
      value: sizePerPage,
    },
  });

export const getPagesByCategoryTitle = (categoryTitle) =>
  api(`/v1/category/${categoryTitle}/count`, { method: 'GET' });
