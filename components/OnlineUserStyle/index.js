import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import NextLink from 'next/link';
import { Link } from '@mui/material';
import LensIcon from '@mui/icons-material/Lens';
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
    getOnlineUser();
  }, [onlineUsers]);

  return (
    <List
      dense
      sx={{ width: '100%', marginTop: 2 }}
      subheader={
        <ListSubheader
          sx={{
            width: '10%',
            marginBottom: 2,
          }}
        >
          ONLINEUSERS
        </ListSubheader>
      }
    >
      {onlineUser.map((value) => {
        return (
          <ListItem
            key={value.id}
            disablePadding
            secondaryAction={
              <LensIcon sx={{ color: '#71F3E9' }} fontSize="0.5px" />
            }
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
                    fontSize: 14,
                    color: 'black',
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
