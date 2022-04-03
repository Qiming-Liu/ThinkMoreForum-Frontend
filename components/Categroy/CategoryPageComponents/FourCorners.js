import React from 'react';
import { Box } from '@mui/material';

const FourCorners = ({ children, tl, tr, bl, br }) => {
  return (
    <Box
      style={{
        position: 'relative',
        width: 'max-content',
        height: 'max-content',
        display: 'flex',
        justifyContet: 'center',
        alignItems: 'center',
        overflow: 'visible',
        padding: '5px',
        borderRadius: '4px',
      }}
    >
      <Box
        style={{
          display: tl ? 'initial' : 'none',
          position: 'absolute',
          backgroundColor: 'transparent',
          top: 0,
          left: 0,
          borderTop: '4px solid #F9441F',
          borderLeft: '4px solid #F9441F',
          width: '30%',
          height: '30%',
          overflow: 'visible',
          borderTopLeftRadius: '4px',
        }}
      />
      <Box
        style={{
          display: tr ? 'initial' : 'none',
          position: 'absolute',
          backgroundColor: 'transparent',
          top: 0,
          right: 0,
          borderTop: '4px solid #F9441F',
          borderRight: '4px solid #F9441F',
          width: '30%',
          height: '30%',
          overflow: 'visible',
          borderTopRightRadius: '4px',
        }}
      />
      <Box
        style={{
          display: bl ? 'initial' : 'none',
          position: 'absolute',
          backgroundColor: 'transparent',
          bottom: 0,
          left: 0,
          borderBottom: '4px solid #F9441F',
          borderLeft: '4px solid #F9441F',
          width: '30%',
          height: '30%',
          overflow: 'visible',
          borderBottomLeftRadius: '4px',
        }}
      />
      <Box
        style={{
          display: br ? 'initial' : 'none',
          position: 'absolute',
          backgroundColor: 'transparent',
          bottom: 0,
          right: 0,
          borderBottom: '4px solid #F9441F',
          borderRight: '4px solid #F9441F',
          width: '30%',
          height: '30%',
          overflow: 'visible',
          borderBottomRightRadius: '4px',
        }}
      />
      {children}
    </Box>
  );
};

export default FourCorners;
