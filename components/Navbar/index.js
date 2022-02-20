import React from 'react';
import styled from '@emotion/styled';
import { AppBar, Box, Toolbar } from '@mui/material';
import AccountButton from './AccountButton';
import NotificationsButton from './NotificationsButton';
import Login from '../Login';

const NavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  ...(theme.palette.mode === 'light'
    ? {
        boxShadow: theme.shadows[3],
      }
    : {
        backgroundColor: theme.palette.background.paper,
        borderBottomColor: theme.palette.divider,
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
        boxShadow: 'none',
      }),
}));

const Navbar = (props) => {
  const { ...other } = props;

  return (
    <NavbarRoot {...other}>
      <Toolbar
        disableGutters
        sx={{
          minHeight: 64,
          left: 0,
          px: 2,
        }}
      >
        <Box sx={{ flexGrow: 1 }} />
        <Login />
        <NotificationsButton />
        <AccountButton />
      </Toolbar>
    </NavbarRoot>
  );
};

export default Navbar;
