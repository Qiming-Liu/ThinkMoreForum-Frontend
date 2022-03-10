import http from '../utils/axios';

// Users
export const login = (email, password) =>
  http(`/login`, { method: 'POST', data: { email, password } });

export const register = (email, username, password) =>
  http(`/v1/public/users/register`, {
    method: 'POST',
    data: {
      email,
      username,
      password,
    },
  });

export const thirdpartylogin = (email, username, oauthtype, openid) =>
  http(`/v1/public/users/third_party_login`, {
    method: 'POST',
    data: {
      email,
      username,
      oauthtype,
      openid,
    },
  });

export const uniqueEmail = (email) =>
  http(`/v1/public/users/unique_email/${email}`, { method: 'get' });

export const uniqueUsername = (username) =>
  http(`/v1/public/users/unique_username/${username}`, { method: 'get' });

export const sendResetPasswordEmail = (email) =>
  http(`/v1/public/users/reset_password/${email}`, { method: 'GET' });

// Category
export const getAllCategories = () =>
  http(`/v1/public/category`, { method: 'GET' });

export const getCategoryByTitle = (categoryTitle) =>
  http(`/v1/public/category/${categoryTitle}`, { method: 'GET' });


export const getAllUsers = () => http(`/v1/public/users`, { method: 'GET' });

export const getVisiblePostsByCategoryTitle = (
  categoryTitle,
  currentPage,
  sizePerPage,
  sortParams = 'createTimestamp,DESC',
) => {
  return http(`/v1/public/category/${categoryTitle}/visible_post`, {
    method: 'GET',
    params: {
      page: currentPage,
      size: sizePerPage,
      sort: sortParams,
    },
  });
};

export const getVisiblePostCountByCategoryTitle = (categoryTitle) =>
  http(`/v1/public/category/${categoryTitle}/visible_count`, { method: 'GET' });

// Post
export const getPostById = (postId) =>
  http(`/v1/public/post/${postId}`, { method: 'GET' });

export const getAllPosts = () => http(`/v1/public/post`, { method: 'GET' });

export const updatePostViewCount = (postId) =>
  http(`/v1/public/post/${postId}/view_count`, { method: 'PUT' });

export const getPostByUsername = (username) =>
  http(`/v1/public/post/user/${username}`, { method: 'GET' });

export const getFollowPostByUsername = (username) =>
  http(`/v1/public/post/follows/find_all_by_username/${username}`, {
    method: 'GET',
  });

// Comment
export const getCommentsByPostId = (postId) =>
  http(`/v1/public/comment/${postId}`, { method: 'GET' });
