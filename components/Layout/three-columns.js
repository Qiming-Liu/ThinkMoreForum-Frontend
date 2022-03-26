import React from 'react';
import { Container } from '@mui/material';

const ThreeColumns = ({ children }) => {
  return <Container maxWidth="md">{children}</Container>;
};

export default ThreeColumns;
