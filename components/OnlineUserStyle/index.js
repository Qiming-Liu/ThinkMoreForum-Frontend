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
import { useSelector } from 'react-redux';
import * as userService from '../../services/Users';

const OnlineUserStyle = () => {
  const { isLogin } = useSelector((state) => state.sign);
  const [onlineUser, setOnlineUser] = useState([]);

  useEffect(() => {
    if (isLogin) {
      const getOnlineUser = async () => {
        const { data: onlineUsers } = await userService.getAllUsers();
        setOnlineUser(onlineUsers);
      };
      getOnlineUser();
    }
  }, [isLogin]);

  return (
    <List
      dense
      sx={{ width: '104%', marginTop: 2 }}
      subheader={
        <ListSubheader
          sx={{
            width: '10%',
            marginBottom: 2,
            bgcolor: '#F9FAFC',
            fontColor: 'black',
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
