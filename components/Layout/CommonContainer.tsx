import React from 'react';
import { Container } from '@mui/material';
import Footer from '../Footer';

type CommonContainerProps = {
  children: React.ReactNode;
  noFooter?: boolean;
};

const CommonContainer = ({
  children,
  noFooter = false,
}: CommonContainerProps) => {
  return (
    <>
      <Container maxWidth="md">{children}</Container>
      {!noFooter && <Footer />}
    </>
  );
};

export default CommonContainer;
