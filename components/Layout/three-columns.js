import React from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import RandomPost from '../RandomPost/index.tsx';
import SearchBar from '../SearchBar';
import OnlineUser from '../OnlineUser';

const ThreeColumns = ({ children }) => {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));
  if (mobileDevice) {
    return (
      <Grid
        container
        direction="column"
        spacing={3}
        justifyContent="flex-start"
        alignItems="center"
      >
        <Grid item width="95vw">
          <Box justifyContent="flex-start">
            <SearchBar />
          </Box>
        </Grid>
        <Grid item width="95vw">
          <OnlineUser mobileDevice={mobileDevice} />
        </Grid>
        <Grid item>
          <Container maxWidth={false}>{children}</Container>
        </Grid>
      </Grid>
    );
  }
  return (
    <Grid container direction="row" spacing={4}>
      <Grid item xs={2.75}>
        <Paper
          elevation={2}
          style={{
            backgroundColor: 'white',
            borderRadius: '15px',
            marginTop: '5px',
            marginLeft: '15px',
            padding: '10px',
            height: '85vh',
          }}
        >
          <SearchBar />
          <OnlineUser />
        </Paper>
      </Grid>
      <Grid item xs={6.5}>
        {children}
      </Grid>
      <Grid item xs={2.75}>
        <RandomPost />
      </Grid>
    </Grid>
  );
};

export default ThreeColumns;
