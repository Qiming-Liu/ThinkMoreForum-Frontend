import React from 'react';
import { Grid, Box, useTheme, useMediaQuery } from '@mui/material';
import RandomPost from '../RandomPost/index.tsx';
import LeftSideColum from '../LeftSideColumn';

const ThreeColumns = ({ children }) => {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));
  if (mobileDevice) {
    return (
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          width: '90%',
        }}
      >
        {children}
      </Box>
    );
  }
  return (
    <Grid container direction="row" spacing={2}>
      <Grid
        item
        xs={3}
        style={{
          paddingTop: '10px',
        }}
      >
        <LeftSideColum />
      </Grid>
      <Grid item xs={6}>
        {children}
      </Grid>
      <Grid item xs={3}>
        <RandomPost />
      </Grid>
    </Grid>
  );
};

export default ThreeColumns;
