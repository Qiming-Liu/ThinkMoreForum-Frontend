import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Container, Grid } from '@mui/material';

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

const Layout = ({ children }) => {
  return (
    <LayoutRoot>
      {children[0]}
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
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
          <Container maxWidth="md">{children[1]}</Container>
        </Box>
        <Container maxWidth="xl">{children[2]}</Container>
      </Grid>
    </LayoutRoot>
  );
};

export default Layout;
