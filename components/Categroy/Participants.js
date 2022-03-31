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
        mt: 4,
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
          width: '2rem',
          height: '2rem',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography
          color="#0d47a1"
          variant="subtitle1"
          style={{
            transform: 'translateX(-6%)',
            fontWeight: 'bold',
          }}
        >
          {count}
        </Typography>
      </Box>
      <Typography color="white" variant="subtitle1">
        Participants
      </Typography>
    </Box>
  );
};

export default Participants;
