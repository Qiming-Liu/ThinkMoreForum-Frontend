import React, { useState, useEffect } from 'react';
import { Box, Divider, Grid, List, ListItem, Typography } from '@mui/material';
import styled from 'styled-components';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
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

const OnlineUser = ({ mobileDevice }) => {
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

  if (mobileDevice) {
    return (
      <Grid container direction="row" spacing={2} width="95vw" sx={{ pl: 1 }}>
        {onlineUser.slice(0, Math.min(10, onlineUser.length)).map((value) => (
          <Grid item md={1}>
            <UserInfoRow userInfo={value} mobileDevice={mobileDevice} />
          </Grid>
        ))}
        {onlineUser.length > 10 && (
          <Grid item md={1}>
            <MoreHorizIcon sx={{ mt: 2 }} />
          </Grid>
        )}
      </Grid>
    );
  }

  return (
    <CustomList
      dense
      sx={{ width: '100%', marginTop: 1 }}
      style={{ overflow: 'hidden' }}
    >
      <Typography sx={{ ml: 2 }} variant="overline" color="#6b778d">
        Online Users
      </Typography>
      <Divider sx={{ mt: 1 }} variant="middle" />
      {onlineUser.length === 0 && (
        <Typography sx={{ ml: 2, mt: 2 }} variant="subtitle1" color="#6b778d">
          No registered users currently online :(
        </Typography>
      )}
      {onlineUser.map((value) => {
        return (
          <ListItem
            key={value.id}
            disablePadding
            secondaryAction={
              <Box
                sx={{
                  backgroundColor: '#057642',
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  mr: 4,
                }}
              />
            }
            sx={{
              my: 2,
              mx: 2,
            }}
          >
            <UserInfoRow userInfo={value} />
          </ListItem>
        );
      })}
    </CustomList>
  );
};

export default OnlineUser;
