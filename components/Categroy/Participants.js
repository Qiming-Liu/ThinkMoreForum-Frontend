import React from 'react';
import { Box, Typography } from '@mui/material';

const Participants = ({ count }) => {
  return (
    <Box
      style={{
        position: 'relative',
      }}
      sx={{
        bgcolor: 'primary.main',
        pl: 0.8,
        pr: 2,
        py: 0.65,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: '24px',
      }}
    >
      <Box
        sx={{
          bgcolor: '#18FFFF',
          mr: 1,
          width: '1.5rem',
          height: '1.5rem',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography
          color="#0d47a1"
          variant="subtitle2"
          style={{
            transform: 'translateX(-6%)',
            fontWeight: 'bold',
          }}
        >
          {count}
        </Typography>
      </Box>
      <Typography color="white" variant="subtitle2">
        Participants
      </Typography>
    </Box>
  );
};

export default Participants;
