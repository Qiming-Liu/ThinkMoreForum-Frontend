import React, { useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import {
  Avatar,
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Popover,
  Typography,
} from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import UserCircleIcon from '../../icons/user-circle';
import CogIcon from '../../icons/cog';
import { logoutAction } from '../../store/actions/signAction';
import { getMyUser } from '../../services/Users';

const AccountPopover = (props) => {
  const { isLogin } = useSelector((state) => state.sign);
  const { anchorEl, onClose, open, ...other } = props;
  const dispatch = useDispatch();
  const router = useRouter();
  const [details, setDetails] = useState({});
  if (isLogin) {
    (async () => {
      const { data } = await getMyUser();
      setDetails(data);
    })();
  }
  const user = {
    avatar: '/logo.png',
    name: details.username,
    role: details && details.role ? details.role.roleName : null,
  };

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'center',
        vertical: 'bottom',
      }}
      keepMounted
      onClose={onClose}
      open={!!open}
      PaperProps={{ sx: { width: 300 } }}
      transitionDuration={0}
      {...other}
    >
      <Box
        sx={{
          alignItems: 'center',
          p: 2,
          display: 'flex',
        }}
      >
        <Avatar
          src={user.avatar}
          sx={{
            height: 40,
            width: 40,
          }}
        >
          <UserCircleIcon fontSize="small" />
        </Avatar>
        <Box
          sx={{
            ml: 1,
          }}
        >
          <Typography variant="body1">{user.name}</Typography>
          <Typography color="textSecondary" variant="body2">
            {user.role}
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Box sx={{ my: 1 }}>
        <NextLink href="/admin" passHref>
          <MenuItem component="a">
            <ListItemIcon>
              <ManageAccountsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="body1">Admin</Typography>}
            />
          </MenuItem>
        </NextLink>
        <NextLink href="/profile" passHref>
          <MenuItem component="a">
            <ListItemIcon>
              <UserCircleIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="body1">Profile</Typography>}
            />
          </MenuItem>
        </NextLink>
        <NextLink href="/personal-setting" passHref>
          <MenuItem component="a">
            <ListItemIcon>
              <CogIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="body1">Settings</Typography>}
            />
          </MenuItem>
        </NextLink>
        <Divider />
        <MenuItem
          onClick={() => {
            dispatch(logoutAction());
            router.push('/');
            onClose();
          }}
        >
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant="body1">Logout</Typography>}
          />
        </MenuItem>
      </Box>
    </Popover>
  );
};

export default AccountPopover;
