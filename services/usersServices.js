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

export const createPost = (requestBody) =>
  http(`/v1/post`, { method: 'POST', data: requestBody });

export const uploadImage = (imageFile) =>
  http(`/v1/img/upload`, {
    method: 'POST',
    data: imageFile,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const getPostsByCategoryTitle = (
  categoryTitle,
  currentPage,
  sizePerPage,
  sortParams = 'createTimestamp,DESC',
) => {
  return http(`/v1/category/${categoryTitle}/post`, {
    method: 'GET',
    params: {
      page: currentPage,
      size: sizePerPage,
      sort: sortParams,
    },
  });
};

export const getVisiblePostsByCategoryTitle = (
  categoryTitle,
  currentPage,
  sizePerPage,
  sortParams = 'createTimestamp,DESC',
) => {
  return http(`/v1/category/${categoryTitle}/visible-post`, {
    method: 'GET',
    params: {
      page: currentPage,
      size: sizePerPage,
      sort: sortParams,
    },
  });
};

export const getPostByPostId = (postId) =>
  http(`/v1/post/${postId}`, { method: 'GET' });

export const getPostCountByCategoryTitle = (categoryTitle) =>
  http(`/v1/category/${categoryTitle}/count`, { method: 'GET' });

export const getVisiblePostCountByCategoryTitle = (categoryTitle) =>
  http(`/v1/category/${categoryTitle}/visible-count`, { method: 'GET' });

export const getAllCategories = () => http(`/v1/category`, { method: 'GET' });

export const getCategoryByCategoryTitle = (categoryTitle) =>
  http(`/v1/category/${categoryTitle}`, { method: 'GET' });

export const getCommentByPost = (postId) =>
  http(`/v1/comment?post_id=${postId}`, { method: 'GET' });

export const getPostByUsername = (username) =>
  http(`/v1/post/user/${username}`, { method: 'GET' });

export const getFollowPostByUsername = (username) =>
  http(`/v1/post/follows/findAllByUsername/${username}`, { method: 'GET' });

export const submitFavoritePost = (postId) =>
  http(`/v1/post/follows/userFollowPost/${postId}`, { method: 'POST' });

export const submitUnfavoritePost = (postId) =>
  http(`/v1/post/follows/userUnfollowPost/${postId}`, { method: 'DELETE' });

export const checkIsFavoringPost = (postId) =>
  http(`/v1/post/follows/checkUserFollowingState/${postId}`, { method: 'GET' });

export const changePostVisibility = (postId) =>
  http(`/v1/post/${postId}/visibility`, { method: 'PUT' });
