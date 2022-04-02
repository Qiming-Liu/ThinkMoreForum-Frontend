import React from 'react';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import NextLink from 'next/link';
import { ListItemButton, Typography } from '@mui/material';

const UserInfoRow = ({ userInfo }) => {
  return (
    <NextLink
      href={{
        pathname: `/profile/${userInfo.username}`,
      }}
      passHref
    >
      <ListItemButton>
        <ListItemAvatar>
          <Avatar
            src={userInfo.headImgUrl}
            sx={{
              width: 32,
              height: 32,
              boxShadow:
                '2px 4px 4px 1px rgba(100, 100, 100, 0.1), 0px 2px 4px 1px rgba(100, 100, 100, 0.1)',
            }}
          />
        </ListItemAvatar>
        <NextLink
          href={{
            pathname: `/profile/${userInfo.username}`,
          }}
          passHref
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            textDecoration: 'none',
            color: '#65748B',
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{ color: '#546378', marginLeft: '-10px' }}
          >
            {`${userInfo.username}`}
          </Typography>
        </NextLink>
      </ListItemButton>
    </NextLink>
  );
};

export default UserInfoRow;
