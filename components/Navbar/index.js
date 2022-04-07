import React from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import NextLink from 'next/link';
import { useSelector } from 'react-redux';
import { AppBar, Box, Toolbar, useTheme, useMediaQuery } from '@mui/material';
import AccountButton from './AccountButton';
import NotificationsButton from './NotificationsButton';
import Sign from '../Sign';

const ThinkMoreLogo = styled.div`
  margin-top: -6px;
  margin-left: 48%;
  transform: translateX(-50%);
`;

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
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));
  const { isLogin } = useSelector((state) => state.sign);
  return (
    <NavbarRoot>
      <Toolbar
        disableGutters
        sx={{
          height: 60,
          left: 0,
          pl: 3,
          pr: mobileDevice ? 3 : 5,
        }}
      >
        <NextLink href="/" passHref>
          <Box sx={{ cursor: 'pointer' }}>
            <Image
              src="/logo.svg"
              height="35"
              width="35"
              alt="logo"
              className="shadow"
            />
          </Box>
        </NextLink>

        {mobileDevice || (
          <ThinkMoreLogo>
            <NextLink href="/" passHref>
              <h1
                style={{
                  fontFamily: 'Quicksand, sans-serif',
                  fontSize: '2rem',
                  color: '#222429',
                  marginBottom: '0',
                  cursor: 'pointer',
                }}
              >
                thinkmore.
              </h1>
            </NextLink>
          </ThinkMoreLogo>
        )}
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
