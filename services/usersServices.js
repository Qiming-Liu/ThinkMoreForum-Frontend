import http from '../utils/axios';

export const login = (email, password) =>
  http(`/login`, { method: 'POST', data: { email, password } });

export const resetPasswordemail = (email) =>
  http(`/v1/users/reset-password/${email}`, { method: 'GET' });

export const getPostsByCategoryTitle = (
  categoryTitle,
  currentPage,
  sizePerPage,
) =>
  http(`/v1/category/${categoryTitle}`, {
    method: 'GET',
    params: {
      page: currentPage,
      value: sizePerPage,
    },
  });

export const getPagesByCategoryTitle = (categoryTitle) =>
  http(`/v1/category/${categoryTitle}/count`, { method: 'GET' });

export const getPostByPostId = (postId) =>
  http(`/v1/post/${postId}`, { method: 'GET' });

export const getNotifications = () =>
  http(`/v1/notification`, { method: 'GET' });
