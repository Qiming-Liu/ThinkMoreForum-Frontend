import React from 'react';
import { Container } from '@mui/material';
import Footer from '../Footer';

const CommonContainer = ({ children, noFooter = false }) => {
  return (
    <>
      <Container maxWidth="md">{children}</Container>
      {!noFooter && <Footer />}
    </>
  );
};

export default CommonContainer;
