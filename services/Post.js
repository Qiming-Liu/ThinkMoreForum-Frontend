import http from '../utils/axios';

export const postPost = ({ categoryTitle, title, context, headImgUrl }) =>
  http(`/v1/post`, {
    method: 'POST',
    data: {
      categoryTitle,
      title,
      context,
      headImgUrl,
    },
  });

export const submitFavoritePost = (postId) =>
  http(`/v1/post/follows/userFollowPost/${postId}`, { method: 'POST' });

export const submitUnfavoritePost = (postId) =>
  http(`/v1/post/follows/userUnfollowPost/${postId}`, { method: 'DELETE' });

export const checkIsFavoringPost = (postId) =>
  http(`/v1/post/follows/checkUserFollowingState/${postId}`, { method: 'GET' });

export const changePostVisibility = (postId) =>
  http(`/v1/post/${postId}/visibility`, { method: 'PUT' });
