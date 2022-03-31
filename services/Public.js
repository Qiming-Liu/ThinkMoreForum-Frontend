import http from '../utils/axios';

// Users
export const login = (email, password) =>
  http(`/login`, { method: 'POST', data: { email, password } });

export const register = ({ email, username, password }) =>
  http(`/v1/public/users/register`, {
    method: 'POST',
    data: {
      email,
      username,
      password,
    },
  });

export const thirdpartylogin = ({ oauthType, openid }, email, username) =>
  http(`/v1/public/users/third_party_login/${email}/${username}`, {
    method: 'POST',
    data: {
      oauthType,
      openid,
    },
  });

export const uniqueEmail = (email) =>
  http(`/v1/public/users/unique_email/${email}`, { method: 'get' });

export const uniqueUsername = (username) =>
  http(`/v1/public/users/unique_username/${username}`, { method: 'get' });

export const sendResetPasswordEmail = (email) =>
  http(`/v1/public/users/reset_password/${email}`, { method: 'GET' });

export const getUserByUsername = (username) =>
  http(`/v1/public/users/username/${username}`, { method: 'GET' });

// Category
export const getAllCategories = () =>
  http(`/v1/public/category`, { method: 'GET' });

export const getCategoryByTitle = (categoryTitle) =>
  http(`/v1/public/category/${categoryTitle}`, { method: 'GET' });

export const getVisiblePostsByCategoryId = (
  categoryId,
  currentPage,
  sizePerPage,
  sortParams = 'createTimestamp,DESC',
) => {
  return http(`/v1/public/category/${categoryId}/visible_post`, {
    method: 'GET',
    params: {
      page: currentPage,
      size: sizePerPage,
      sort: sortParams,
    },
  });
};

export const getVisiblePostCountByCategoryId = (categoryId) =>
  http(`/v1/public/category/${categoryId}/visible_count`, { method: 'GET' });

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

export const getMaxCountCommentPost = () =>
  http(`/v1/public/post/max_count_comment`, { method: 'GET' });

// Comment
export const getCommentsByPostId = (postId) =>
  http(`/v1/public/comment/${postId}`, { method: 'GET' });

// component
export const getComponentByName = (name) =>
  http(`/v1/public/component/${name}`, { method: 'GET' });

// Follower, Following
export const getFollowing = (username) =>
  http(`/v1/public/following/${username}`, { method: 'GET' });

export const getFollower = (username) =>
  http(`/v1/public/follower/${username}`, { method: 'GET' });
