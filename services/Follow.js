import http from '../utils/axios';

export const followUser = (username) =>
  http(`/v1/users/follow/${username}`, { method: 'POST' });

export const unfollowUser = (username) =>
  http(`/v1/users/unfollow/${username}`, { method: 'DELETE' });

export const getFollowedStatus = (username) =>
  http(`/v1/users/followed_status/${username}`, { method: 'GET' });
