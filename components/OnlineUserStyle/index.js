import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import NextLink from 'next/link';
import { Link } from '@mui/material';
import * as userService from '../../services/Public';
import { useWSContext } from '../../contexts/WSContext';

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
    <List
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
          }}
        >
          Online Users
        </ListSubheader>
      }
    >
      {onlineUser.map((value) => {
        return (
          <ListItem
            key={value.id}
            disablePadding
            secondaryAction={
              <div
                style={{
                  backgroundColor: '#8AE68A',
                  width: 15,
                  height: 15,
                  borderRadius: '50%',
                  marginRight: '18px',
                }}
              />
            }
            style={{
              marginTop: '18px',
              marginBottom: '18px',
            }}
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar src={value.headImgUrl} sx={{ mr: 2 }} />
              </ListItemAvatar>
              <NextLink
                href={{
                  pathname: `/profile/${value.username}`,
                }}
                passHref
              >
                <Link
                  href={{
                    pathname: `/profile/${value.username}`,
                  }}
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    textDecoration: 'none',
                    fontSize: 17,
                    letterSpacing: 1.2,
                    color: '#222429',
                  }}
                >
                  {`${value.username}`}
                </Link>
              </NextLink>
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default OnlineUserStyle;
