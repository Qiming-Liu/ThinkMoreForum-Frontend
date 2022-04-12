import http from '../utils/axios';

export const putCategories = (changedCategories: any) =>
  http(`/v1/category`, {
    method: 'PUT',
    data: changedCategories,
  });

export const putCategoryPinPostById = (categoryId: string, postId: string) => {
  http(`/v1/category/${categoryId}/pin/${postId}`, {
    method: 'PUT',
    data: { categoryId, postId },
  });
};

export const putCategoryPinPostNull = (categoryId: string) => {
  http(`/v1/category/${categoryId}/unpin`, {
    method: 'PUT',
    data: { categoryId },
  });
};
