import React, { useState, useEffect } from 'react';
import { Box, Container, Divider } from '@mui/material';
import parser from 'html-react-parser';
import { getComponentByName } from '../../services/Public';
import DefaultFooter from './DefaultFooter';

const Footer = () => {
  const [customFooter, setCustomFooter] = useState('');
  useEffect(() => {
    const getFooter = async () => {
      const { data } = await getComponentByName('footer');
      setCustomFooter(data.code);
    };
    getFooter();
  }, []);
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 8 }}>
        <Divider />
        {customFooter === '' ? <DefaultFooter /> : parser(customFooter)}
      </Box>
    </Container>
  );
};

export default Footer;
