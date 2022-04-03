import React from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Stack,
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
      <Stack direction="column" spacing={3}>
        <Box sx={{ mx: 5 }}>
          <SearchBar />
        </Box>
        <OnlineUser mobileDevice={mobileDevice} />
        <Container maxWidth={false}>{children}</Container>
      </Stack>
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
