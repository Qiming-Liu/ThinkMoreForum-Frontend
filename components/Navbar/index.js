import React from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import NextLink from 'next/link';
import { useSelector } from 'react-redux';
import { AppBar, Box, Toolbar } from '@mui/material';
import AccountButton from './AccountButton';
import NotificationsButton from './NotificationsButton';
import Sign from '../Sign';

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

const Navbar = () => {
  const { isLogin } = useSelector((state) => state.sign);
  return (
    <NavbarRoot>
      <Toolbar
        disableGutters
        sx={{
          minHeight: 64,
          left: 0,
          px: 2,
        }}
      >
        <NextLink href="/" passHref>
          <div style={{ cursor: 'pointer' }}>
            <Image src="/logo.png" height="35" width="35" alt="logo" />
          </div>
        </NextLink>
        <Box sx={{ flexGrow: 1 }} />
        <>
          {isLogin || <Sign />}
          {isLogin && <NotificationsButton />}
          <AccountButton isLogin={isLogin} />
        </>
      </Toolbar>
    </NavbarRoot>
  );
};

export default Navbar;
