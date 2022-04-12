import http from '../utils/axios';

export const followUser = (username: string) =>
  http(`/v1/users/follow/${username}`, { method: 'POST' });

export const unfollowUser = (username: string) =>
  http(`/v1/users/unfollow/${username}`, { method: 'DELETE' });

export const getFollowedStatus = (username: string) =>
  http(`/v1/users/followed_status/${username}`, { method: 'GET' });
