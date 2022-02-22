import api from '../utils/axios';

export const login = (email, password) =>
  api(`/login`, { method: 'POST', data: { email, password } });

export const resetPasswordemail = (email) =>
  api(`/v1/users/reset-password/${email}`, { method: 'GET' });

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
