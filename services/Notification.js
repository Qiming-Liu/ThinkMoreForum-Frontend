import http from '../utils/axios';

export const getNotifications = () =>
  http(`/v1/notification`, { method: 'GET' });

export const createNotification = (type, user) =>
  http(`/v1/notification/${type}`, {
    method: 'POST',
    data: {
      users: user,
      viewed: false,
    },
  });

export const markAsViewed = (notificationId) =>
  http(`/v1/notification/viewed/${notificationId}`, { method: 'GET' });

export const markAllAsViewed = () =>
  http(`/v1/notification/viewed-all`, { method: 'GET' });
