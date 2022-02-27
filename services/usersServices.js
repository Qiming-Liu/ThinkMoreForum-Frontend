import http from '../utils/axios';

export const login = (email, password) =>
  http(`/login`, { method: 'POST', data: { email, password } });

export const register = (email, username, password) =>
  http(`/v1/users/register/${email}/${username}/${password}`, {
    method: 'POST',
  });

export const uniqueEmail = (email) =>
  http(`/v1/users/unique-email/${email}`, { method: 'get' });

export const uniqueUsername = (username) =>
  http(`/v1/users/unique-username/${username}`, { method: 'get' });

export const getNotifications = () =>
  http(`/v1/notification`, { method: 'GET' });

export const markAsViewed = (notificationId) =>
  http(`/v1/notification/viewed/${notificationId}`, { method: 'GET' });

export const markAllAsViewed = () =>
  http(`/v1/notification/viewed-all`, { method: 'GET' });

export const resetPasswordemail = (email) =>
  http(`/v1/users/reset-password/${email}`, { method: 'GET' });

export const resetPassword = (password) =>
  http(`/v1/users/password-reset/${password}`, { method: 'PUT' });

export const getPostsByCategoryTitle = (
  categoryTitle,
  currentPage,
  sizePerPage,
) =>
  http(`/v1/category/${categoryTitle}/post`, {
    method: 'GET',
    params: {
      page: currentPage,
      value: sizePerPage,
    },
  });

export const getPostByPostId = (postId) =>
  http(`/v1/post/${postId}`, { method: 'GET' });

export const getPostCountByCategoryTitle = (categoryTitle) =>
  http(`/v1/category/${categoryTitle}/count`, { method: 'GET' });

export const getAllCategories = () => http(`/v1/category`, { method: 'GET' });

export const getCategoryByCategoryTitle = (categoryTitle) =>
  http(`/v1/category/${categoryTitle}`, { method: 'GET' });

export const getCommentByPost = (postId) =>
  http(`/v1/comment?post_id=${postId}`, { method: 'GET' });
