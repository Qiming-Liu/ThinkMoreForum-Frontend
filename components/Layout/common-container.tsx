import React from 'react';
import { Container } from '@mui/material';
import Footer from '../Footer';

const CommonContainer = ({
  children,
  noFooter = false,
}: {
  children: React.ReactNode;
  noFooter: boolean;
}) => {
  return (
    <>
      <Container maxWidth="md">{children}</Container>
      {!noFooter && <Footer />}
    </>
  );
};

export default CommonContainer;
