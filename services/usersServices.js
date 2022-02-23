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
  api(`/v1/category/${categoryTitle}/post`, {
    method: 'GET',
    params: {
      page: currentPage,
      value: sizePerPage,
    },
  });

export const getPagesByCategoryTitle = (categoryTitle) =>
  api(`/v1/category/${categoryTitle}/count`, { method: 'GET' });

export const getPostByPostId = (postId) =>
  api(`/v1/post/${postId}`, { method: 'GET' });
