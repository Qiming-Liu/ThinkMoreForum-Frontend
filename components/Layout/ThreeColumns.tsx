import React from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import RandomPost from '../RandomPost';
import SearchBar from '../SearchBar';
import OnlineUser from '../OnlineUser';

interface ThreeColumnsProps {
  children: React.ReactNode;
  randomPost: any;
}

const ThreeColumns = ({ children, randomPost }: ThreeColumnsProps) => {
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
    <Grid
      container
      direction="row"
      spacing={4}
      style={{ position: 'relative', justifyContent: 'center' }}
    >
      <Grid
        item
        xs={2.75}
        style={{ position: 'fixed', left: '-30px', top: '64px', width: '23%' }}
      >
        <Paper
          elevation={2}
          style={{
            backgroundColor: 'white',
            borderRadius: '15px',
            marginLeft: '15px',
            padding: '10px',
            height: '85vh',
          }}
        >
          <SearchBar />
          <OnlineUser mobileDevice={mobileDevice} />
        </Paper>
      </Grid>
      <Grid item xs={6.5} style={{ position: 'relative' }}>
        {children}
      </Grid>
      <Grid
        item
        xs={2.75}
        style={{ position: 'fixed', right: '5px', top: '64px', width: '23%' }}
      >
        <RandomPost randomPost={randomPost} />
      </Grid>
    </Grid>
  );
};

export default ThreeColumns;
