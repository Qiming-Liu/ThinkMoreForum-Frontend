import React, { createContext, useContext, useState, useMemo } from 'react';

const UsersRoleContext = createContext([]);

export const UsersRoleContextProvider = ({ children }) => {
  const [usersToSubmit, setUsersToSubmit] = useState([]);

  const findInstanceByUserId = (user, userList) => {
    const targetUserInList = userList.find((item) => item.id === user.id);
    return targetUserInList !== undefined;
  };

  const addUsersToSubmit = (updatedUsers) => {
    setUsersToSubmit((prevData) => {
      const filteredUpdateUsers = updatedUsers.filter((updatedUser) => {
        if (findInstanceByUserId(updatedUser, prevData)) {
          return false;
        }
        return true;
      });
      return [...prevData, ...filteredUpdateUsers];
    });
  };

  const deleteUserToSubmit = (cancelledUser) => {
    setUsersToSubmit((prevData) =>
      prevData.filter((userToSubmit) => userToSubmit.id !== cancelledUser.id),
    );
  };

  const deleteUsersToSubmit = (cancelledUsers) => {
    const newUsersToSubmit = usersToSubmit.filter(
      (userToSubmit) => !findInstanceByUserId(userToSubmit, cancelledUsers),
    );
    setUsersToSubmit(newUsersToSubmit);
  };

  const value = useMemo(
    () => ({
      usersToSubmit,
      setUsersToSubmit,
      addUsersToSubmit,
      deleteUserToSubmit,
      deleteUsersToSubmit,
      findInstanceByUserId,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [usersToSubmit],
  );

  return (
    <UsersRoleContext.Provider value={value}>
      {children}
    </UsersRoleContext.Provider>
  );
};

export const useUsersRoleContext = () => {
  return useContext(UsersRoleContext);
};
