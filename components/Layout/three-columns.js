import React from 'react';
import { Grid } from '@mui/material';
import SearchBar from '../SearchBar';

const ThreeColumns = ({ children }) => {
  return (
    <Grid container direction="row" spacing={2}>
      <Grid item xs={3}>
        <SearchBar />
      </Grid>
      <Grid item xs={6}>
        {children}
      </Grid>
      <Grid item xs={3}>
        <SearchBar />
      </Grid>
    </Grid>
  );
};

export default ThreeColumns;
