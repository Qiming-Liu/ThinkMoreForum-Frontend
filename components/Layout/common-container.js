import React from 'react';
import { Container } from '@mui/material';

const CommonContainer = ({ children }) => {
  return <Container maxWidth="md">{children}</Container>;
};

export default CommonContainer;
