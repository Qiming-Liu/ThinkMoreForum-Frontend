import React from 'react';
import NextLink from 'next/link';
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
import SettingsIcon from '@mui/icons-material/Settings';
import { logoutAction } from '../../store/actions/signAction';
import { useWSContext } from '../../contexts/WebsocketContext';

const AccountPopover = (props) => {
  const { anchorEl, onClose, open, ...other } = props;
  const dispatch = useDispatch();
  const { myDetail } = useSelector((state) => state.sign);
  const { disconnect } = useWSContext();

  const handleLogout = () => {
    disconnect(myDetail.username);
    dispatch(logoutAction());
    onClose();
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
      <NextLink
        href={{
          pathname: `/profile/${myDetail.username}`,
        }}
        passHref
      >
        <Box
          sx={{
            alignItems: 'center',
            p: 2,
            display: 'flex',
            cursor: 'pointer',
          }}
        >
          <Avatar
            src={myDetail.headImgUrl}
            sx={{
              height: 40,
              width: 40,
            }}
          />

          <Box
            sx={{
              ml: 1,
            }}
          >
            <Typography variant="body1">{myDetail.username}</Typography>
            <Typography color="textSecondary" variant="body2">
              {myDetail.role.roleName}
            </Typography>
          </Box>
        </Box>
      </NextLink>
      <Divider />
      <Box sx={{ my: 1 }}>
        {myDetail.role.roleName === 'admin' && (
          <NextLink href="/admin/users" passHref>
            <MenuItem component="a">
              <ListItemIcon>
                <ManageAccountsIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="body1">Admin</Typography>}
              />
            </MenuItem>
          </NextLink>
        )}
        <NextLink href="/setting" passHref>
          <MenuItem component="a">
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="body1">Settings</Typography>}
            />
          </MenuItem>
        </NextLink>
        <Divider />
        <NextLink href="/" passHref>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="body1">Logout</Typography>}
            />
          </MenuItem>
        </NextLink>
      </Box>
    </Popover>
  );
};

export default AccountPopover;
