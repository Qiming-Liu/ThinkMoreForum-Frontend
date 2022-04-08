import { useState, useMemo, useCallback } from 'react';

const useUsersToSubmit = () => {
  const [usersToSubmit, setUsersToSubmit] = useState([]);

  const findInstanceByUserId = (user: any, userList: Array<any>) => {
    const targetUserInList = userList.find((item) => item.id === user.id);
    return targetUserInList !== undefined;
  };

  const addUsersToSubmit = useCallback((updatedUser) => {
    setUsersToSubmit((prevData: any) => {
      if (findInstanceByUserId(updatedUser, prevData)) {
        return prevData.map((row: any) =>
          row.id === updatedUser.id ? { ...row, ...updatedUser } : row,
        );
      }
      return [...prevData, updatedUser];
    });
  }, []);

  const value = useMemo(
    () => ({
      usersToSubmit,
      setUsersToSubmit,
      addUsersToSubmit,
      findInstanceByUserId,
    }),
    [addUsersToSubmit, usersToSubmit],
  );

  return value;
};

export default useUsersToSubmit;
