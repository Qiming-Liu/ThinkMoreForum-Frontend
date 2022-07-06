import React, { useState, useEffect } from 'react';
import {
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  Typography,
  Paper,
  Zoom,
} from '@mui/material';
import styled from 'styled-components';
import { makeStyles } from '@mui/styles';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import * as userService from '../../services/Public';
import { useWSContext } from '../../contexts/WebsocketContext';
import UserInfoRow from './UserInfoRow';

const CustomPaper = styled(Paper)`
  overflow: hidden;

  &:hover {
    overflow-y: scroll;
    overflow-y: overlay;
  }
`;

const useStyles = makeStyles(() => ({
  root: {
    '&::-webkit-scrollbar': {
      width: '5px',
      height: '5px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '1em',
      backgroundColor: 'rgba(50, 50, 50, 0.1)',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '1em',
      backgroundColor: 'rgba(50, 50, 50, 0.3)',
    },
  },
}));

const OnlineUser = ({ mobileDevice }: { mobileDevice: boolean }) => {
  const classes = useStyles();
  const [onlineUser, setOnlineUser] = useState([]);
  const { onlineUsers }: any = useWSContext();
  const [noOnlineUser, setNoOnlineUser] = useState(false);

  useEffect(() => {
    const getOnlineUser = async () => {
      if (onlineUsers.length === 0) {
        setNoOnlineUser(true);
        return;
      }
      const currentUsers = onlineUsers.map(async (user: any) => {
        const { data: res } = await userService.getUserByUsername(user);
        return res;
      });
      const result: any = await Promise.all(currentUsers);
      setOnlineUser(result);
    };
    if (onlineUsers) {
      getOnlineUser();
    }
  }, [onlineUsers]);

  if (mobileDevice) {
    return (
      <Grid container direction="row" spacing={2} width="95vw" sx={{ pl: 1 }}>
        {onlineUser
          .slice(0, Math.min(10, onlineUser.length))
          .map((value: any) => (
            <Grid key={value.username} item md={1}>
              <UserInfoRow userInfo={value} mobileDevice />
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
    <List
      dense
      sx={{ width: '100%', marginTop: 1 }}
      style={{ overflow: 'hidden' }}
    >
      <Typography sx={{ ml: 2 }} variant="overline" color="#6b778d">
        Online Users
      </Typography>
      <Divider sx={{ mt: 1 }} variant="middle" />
      <CustomPaper
        elevation={0}
        sx={{ bgcolor: 'transparent' }}
        style={{ height: '70vh' }}
        className={classes.root}
      >
        <>
          {onlineUser.length === 0 && (
            <Typography sx={{ ml: 2 }} variant="overline" color="#6b778d">
              {noOnlineUser ? 'No user online' : 'Connecting...'}
            </Typography>
          )}
          {onlineUser.map((value: any) => {
            if (value) {
              return (
                <ListItem
                  key={value.id}
                  disablePadding
                  secondaryAction={
                    <Zoom in>
                      <Box
                        sx={{
                          backgroundColor: '#057642',
                          width: 10,
                          height: 10,
                          borderRadius: '50%',
                          mr: 3,
                        }}
                      />
                    </Zoom>
                  }
                  sx={{
                    my: 2,
                  }}
                >
                  <UserInfoRow userInfo={value} mobileDevice={false} />
                </ListItem>
              );
            }
            return null;
          })}
        </>
      </CustomPaper>
    </List>
  );
};

export default OnlineUser;
