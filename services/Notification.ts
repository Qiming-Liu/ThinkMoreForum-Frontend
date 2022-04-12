import http from '../utils/axios';

export const getNotifications = () =>
  http(`/v1/notification`, { method: 'GET' });

export const markAsViewed = (notificationId: string) =>
  http(`/v1/notification/viewed/${notificationId}`, { method: 'GET' });

export const markAllAsViewed = () =>
  http(`/v1/notification/viewed_all`, { method: 'GET' });
