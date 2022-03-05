import http from '../utils/axios';

export const getAllCategories = () => http(`/v1/category`, { method: 'GET' });

export const getCategoryByCategoryTitle = (categoryTitle) =>
  http(`/v1/category/${categoryTitle}`, { method: 'GET' });
