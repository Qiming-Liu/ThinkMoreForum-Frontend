import http from '../utils/axios';

export const hasOpenid = () => http(`/v1/users/open_id`, { method: 'GET' });

export const passwordReset = (password) =>
  http(`/v1/users/password_reset`, {
    method: 'PUT',
    data: { new_password: password },
  });

export const getMyUser = () => http(`/v1/users/my_details`, { method: 'GET' });

export const getUserById = (usersId) =>
  http(`/v1/users/details/${usersId}`, { method: 'GET' });

export const getUserByUsername = (username) =>
  http(`/v1/users/detail/${username}`, { method: 'GET' });

export const getCurrentUser = () =>
  http(`/v1/users/my_details`, { method: 'GET' });

export const changeUsersRoles = (usersInfo) => {
  const usersProtoInfo = usersInfo.map((userInfo) => {
    const newUser = {
      id: userInfo.id,
      profileImgUrl: userInfo.avatarUrl,
      email: userInfo.email,
      username: userInfo.name,
      role: { roleName: userInfo.role },
    };
    return newUser;
  });
  http(`/v1/users/roles`, { method: 'PUT', data: usersProtoInfo });
};

export const changePassword = ({ oldPassword, newPassword }) =>
  http(`/v1/users/password`, {
    method: 'PUT',
    data: {
      oldPassword,
      newPassword,
    },
  });

export const changeUsername = (newUsername) =>
  http(`/v1/users/username/${newUsername}`, { method: 'PUT' });

export const changeHeadImg = ({ headImgUrl }) =>
  http(`/v1/users/headimg`, {
    method: 'PUT',
    data: {
      headImgUrl,
    },
  });

export const changeEmail = (newEmail) =>
  http(`/v1/users/email/${newEmail}`, { method: 'PUT' });

export const sendVerificationEmail = (newEmail) =>
  http(`/v1/users/email/${newEmail}`, { method: 'GET' });
