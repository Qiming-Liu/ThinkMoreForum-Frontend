import http from '../utils/axios';

export const getAllRoles = () => http(`/v1/role/all`, { method: 'GET' });

export const putRole = (data) => http(`/v1/role`, { method: 'PUT', data });
