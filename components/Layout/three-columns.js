import React from 'react';
import { Grid } from '@mui/material';
import RandomPoat from '../RandomPost';
import LeftSideColum from '../LeftSideColumn';

const ThreeColumns = ({ children }) => {
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
        <RandomPoat />
      </Grid>
    </Grid>
  );
};

export default ThreeColumns;
