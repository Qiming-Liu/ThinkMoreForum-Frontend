import http from '../utils/axios';

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
