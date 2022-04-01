import React from 'react';
import { Grid } from '@mui/material';
import SearchBar from '../SearchBar';
import RandomPost from '../RandomPost';
import OnlineUser from '../OnlineUserStyle';

const ThreeColumns = ({ children }) => {
  return (
    <Grid container direction="row" spacing={2}>
      <Grid item xs={3}>
        <SearchBar />
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '5px',
          }}
        >
          <OnlineUser />
        </div>
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
