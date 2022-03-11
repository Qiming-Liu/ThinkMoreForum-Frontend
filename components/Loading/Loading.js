import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';

const LoadingContainer = styled('div')(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  transform: 'translate(calc(50vw - 50%), calc(50vh - 50%))',
}));

const Loading = () => {
  return (
    <LoadingContainer>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Typography variant="h3" color="primary" sx={{ mr: 5, mb: 0.6 }}>
          Loading...
        </Typography>
        <Image src="/loading.svg" layout="fixed" width={60} height={60} />
      </Box>
    </LoadingContainer>
  );
};

export default Loading;
