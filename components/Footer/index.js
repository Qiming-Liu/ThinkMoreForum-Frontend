import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, Divider } from '@mui/material';
import { parser } from '../../utils/htmlParser';
import DefaultFooter from './DefaultFooter';
import { getComponentByName } from '../../services/Public';
import { setFooterAction } from '../../store/actions/signAction';

const Footer = () => {
  const { footer } = useSelector((state) => state.sign);
  const dispatch = useDispatch();
  useEffect(() => {
    const getFooter = async () => {
      const { data } = await getComponentByName('footer');
      dispatch(setFooterAction(data));
    };
    getFooter();
  }, [dispatch]);
  if (!footer) return null;
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 8 }}>
        <Divider />
        {footer.code === '' ? <DefaultFooter /> : parser(footer.code)}
      </Box>
    </Container>
  );
};

export default Footer;
