import http from '../utils/axios';

export const getPostByTitleContainingString = (string: string) =>
  http(`/v1/post/search/${string}`, { method: 'GET' });

export const postPost = ({
  categoryTitle,
  title,
  context,
  headImgUrl,
}: {
  categoryTitle: string;
  title: string;
  context: string;
  headImgUrl: string;
}) =>
  http(`/v1/post`, {
    method: 'POST',
    data: {
      categoryTitle,
      title,
      context,
      headImgUrl,
    },
  });

export const editPost = (
  {
    context,
    headImgUrl,
    title,
  }: {
    context: string;
    headImgUrl: string;
    title: string;
  },
  postId: string,
) =>
  http(`/v1/post/${postId}`, {
    method: 'PUT',
    data: {
      context,
      headImgUrl,
      title,
    },
  });

export const getFollowPostByUsername = (username: string) =>
  http(`/v1/post/follows/find_all_by_username/${username}`, { method: 'GET' });

export const submitFavoritePost = (postId: string) =>
  http(`/v1/post/follows/user_follow_post/${postId}`, { method: 'POST' });

export const submitUnfavoritePost = (postId: string) =>
  http(`/v1/post/follows/user_unfollow_post/${postId}`, { method: 'DELETE' });

export const checkIsFavoringPost = (postId: string) =>
  http(`/v1/post/follows/check_user_following_state/${postId}`, {
    method: 'GET',
  });

export const changePostVisibility = (postId: string) =>
  http(`/v1/post/${postId}/visibility`, { method: 'PUT' });
