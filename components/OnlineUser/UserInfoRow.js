import React from 'react';
import NextLink from 'next/link';
import {
  Avatar,
  ListItemAvatar,
  ListItemButton,
  Tooltip,
  Typography,
  Zoom,
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
          <Zoom in>
            <div
              style={{
                width: 'max-content',
                height: 'max-content',
                border: '2px solid #057642',
                borderRadius: '50%',
              }}
            >
              <Avatar
                src={userInfo.headImgUrl}
                sx={{
                  border: '2px solid #fff',
                  borderRadius: '50%',
                  width: 54,
                  height: 54,
                  cursor: 'pointer',
                }}
              />
            </div>
          </Zoom>
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
          <Zoom in>
            <Avatar
              src={userInfo.headImgUrl}
              sx={{
                width: 40,
                height: 40,
              }}
            />
          </Zoom>
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
            sx={{ color: '#546378', marginLeft: '-2px' }}
          >
            {`${userInfo.username}`}
          </Typography>
        </NextLink>
      </ListItemButton>
    </NextLink>
  );
};

export default UserInfoRow;
