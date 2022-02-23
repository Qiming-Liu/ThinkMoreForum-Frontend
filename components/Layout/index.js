import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Container } from '@mui/material';

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
    {children[1]}
    <Box
      component="main"
      sx={{
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        width: '100%',
        flexGrow: 1,
        py: 4,
      }}
    >
      <Container maxWidth="xl">{children[0]}</Container>
    </Box>
  </LayoutRoot>
);

export default Layout;
