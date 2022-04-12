import http from '../utils/axios';

// Users
export const login = (email: string, password: string) =>
  http(`/login`, { method: 'POST', data: { email, password } });

export const register = ({
  email,
  username,
  password,
}: {
  email: string;
  username: string;
  password: string;
}) =>
  http(`/v1/public/users/register`, {
    method: 'POST',
    data: {
      email,
      username,
      password,
    },
  });

export const uniqueEmail = (email: string) =>
  http(`/v1/public/users/unique_email/${email}`, { method: 'get' });

export const uniqueUsername = (username: string) =>
  http(`/v1/public/users/unique_username/${username}`, { method: 'get' });

export const sendResetPasswordEmail = (email: string) =>
  http(`/v1/public/users/reset_password/${email}`, { method: 'GET' });

export const getUserByUsername = (username: string) =>
  http(`/v1/public/users/username/${username}`, { method: 'GET' });

// Category
export const getAllCategories = () =>
  http(`/v1/public/category`, { method: 'GET' });

export const getCategoryByTitle = (categoryTitle: string) =>
  http(`/v1/public/category/${categoryTitle}`, { method: 'GET' });

export const getVisiblePostsByCategoryId = (
  categoryId: string,
  currentPage: number | never,
  sizePerPage: number | never,
  sortParams: any = 'createTimestamp,DESC',
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

export const getVisiblePostCountByCategoryId = (categoryId: string) =>
  http(`/v1/public/category/${categoryId}/visible_count`, { method: 'GET' });

// Post
export const getPostById = (postId: string) =>
  http(`/v1/public/post/${postId}`, { method: 'GET' });

export const getAllPosts = () => http(`/v1/public/post`, { method: 'GET' });

export const updatePostViewCount = (postId: string) =>
  http(`/v1/public/post/${postId}/view_count`, { method: 'PUT' });

export const getPostByUsername = (username: string) =>
  http(`/v1/public/post/user/${username}`, { method: 'GET' });

export const getFollowPostByUsername = (username: string) =>
  http(`/v1/public/post/follows/find_all_by_username/${username}`, {
    method: 'GET',
  });

export const getRandomPost = () =>
  http(`/v1/public/post/max_count_comment`, { method: 'GET' });

// Comment
export const getCommentsByPostId = (postId: string) =>
  http(`/v1/public/comment/${postId}`, { method: 'GET' });

// Component
export const getComponentByName = (name: string) =>
  http(`/v1/public/component/${name}`, { method: 'GET' });

// Follower, Following
export const getFollowing = (username: string) =>
  http(`/v1/public/following/${username}`, { method: 'GET' });

export const getFollower = (username: string) =>
  http(`/v1/public/follower/${username}`, { method: 'GET' });
