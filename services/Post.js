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

export const getPostByTitleContainingString = (string) =>
  http(`/v1/post/string/${string}`, { method: 'GET' });

export const getFollowPostByUsername = (username) =>
  http(`/v1/post/follows/find_all_by_username/${username}`, { method: 'GET' });

export const submitFavoritePost = (postId) =>
  http(`/v1/post/follows/user_follow_post/${postId}`, { method: 'POST' });

export const submitUnfavoritePost = (postId) =>
  http(`/v1/post/follows/user_unfollow_post/${postId}`, { method: 'DELETE' });

export const checkIsFavoringPost = (postId) =>
  http(`/v1/post/follows/check_user_following_state/${postId}`, {
    method: 'GET',
  });

export const changePostVisibility = (postId) =>
  http(`/v1/post/${postId}/visibility`, { method: 'PUT' });
