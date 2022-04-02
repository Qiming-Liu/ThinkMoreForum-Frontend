import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
import styled from 'styled-components';
import { Divider } from '@mui/material';
import * as userService from '../../services/Public';
import { useWSContext } from '../../contexts/WSContext';
import UserInfoRow from './UserInfoRow';

const CustomList = styled(List)`
  overflow: hidden;

  &:hover {
    overflow-y: scroll;
    overflow-y: overlay;
  }
`;

const OnlineUserStyle = () => {
  const [onlineUser, setOnlineUser] = useState([]);
  const { onlineUsers } = useWSContext();

  useEffect(() => {
    const getOnlineUser = async () => {
      const currentUsers = onlineUsers.map(async (user) => {
        const { data: res } = await userService.getUserByUsername(user);
        return res;
      });
      const result = await Promise.all(currentUsers);
      setOnlineUser(result);
    };
    if (onlineUsers) {
      getOnlineUser();
    }
  }, [onlineUsers]);

  return (
    <CustomList
      dense
      sx={{ width: '100%', marginTop: 1 }}
      subheader={
        <ListSubheader
          sx={{
            bgcolor: 'transparent',
          }}
          style={{
            fontSize: '1.2rem',
            marginLeft: '2px',
            height: '35px',
            overflow: 'hidden',
          }}
        >
          Online Users
        </ListSubheader>
      }
      style={{ overflow: 'hidden' }}
    >
      <Divider sx={{ mt: 1.8 }} variant="middle" />
      {onlineUser.map((value) => {
        return (
          <ListItem
            key={value.id}
            disablePadding
            secondaryAction={
              <div
                style={{
                  backgroundColor: '#8AE68A',
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  marginRight: '10px',
                }}
              />
            }
            sx={{
              my: '13px',
            }}
          >
            <UserInfoRow userInfo={value} />
          </ListItem>
        );
      })}
    </CustomList>
  );
};

export default OnlineUserStyle;
