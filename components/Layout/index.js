import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Container } from '@mui/material';
import Navbar from '../Navbar';

const LayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 280,
    paddingRight: 280,
  },
}));

const Layout = ({ children }) => (
  <LayoutRoot>
    <Navbar />
    <Box
      component="main"
      sx={{
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        width: '100%',
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="xl">{children}</Container>
    </Box>
  </LayoutRoot>
);

export default Layout;
