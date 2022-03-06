import http from '../utils/axios';

export const followUser = (username) =>
  http(`/v1/users/follow/${username}`, { method: 'POST' });

export const getFollowing = (username) =>
  http(`/v1/users/followed/${username}`, { method: 'GET' });