import { nextapi } from '../utils/axios';

export const categoryRefetch = () =>
  nextapi(`/api/category-refetch`, { method: 'POST' });

export const postRefetch = (postId: string) =>
  nextapi(`/api/post-refetch?postid=${postId}`, { method: 'POST' });
