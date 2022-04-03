import React from 'react';
import Paper from '@mui/material/Paper';
import SearchBar from '../SearchBar';
import OnlineUserStyle from '../OnlineUserStyle';

const LeftSideColum = () => {
  return (
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
      <OnlineUserStyle />
    </Paper>
  );
};

export default LeftSideColum;
