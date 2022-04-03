import React from 'react';
import NextLink from 'next/link';
import {
  Avatar,
  ListItemAvatar,
  ListItemButton,
  Tooltip,
  Typography,
} from '@mui/material';

const UserInfoRow = ({ userInfo, mobileDevice }) => {
  if (mobileDevice) {
    return (
      <NextLink
        href={{
          pathname: `/profile/${userInfo.username}`,
        }}
        passHref
      >
        <Tooltip placement="top" title={userInfo.username}>
          <Avatar
            src={userInfo.headImgUrl}
            sx={{
              borderRadius: '100%',
              border: '2px solid #fff',
              outline: '2px solid #057642',
              width: 54,
              height: 54,
              cursor: 'pointer',
            }}
          />
        </Tooltip>
      </NextLink>
    );
  }
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
