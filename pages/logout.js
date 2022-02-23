import React, { useEffect } from 'react';
import NextLink from 'next/link';
import Head from 'next/head';
import { useDispatch } from 'react-redux';
import {
  Box,
  Button,
  Container,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { logoutAction } from '../store/actions/signAction';

const Logout = () => {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  useEffect(() => dispatch(logoutAction()), [dispatch]);

  return (
    <>
      <Head>
        <title>Logout: Success | ThinkMoreForum</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          backgroundColor: 'background.paper',
          display: 'flex',
          flexGrow: 1,
          py: '80px',
        }}
      >
        <Container maxWidth="lg">
          <Typography align="center" variant={mobileDevice ? 'h4' : 'h1'}>
            Logout: Success
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 6,
            }}
          >
            <Box
              alt=""
              component="img"
              src="/logo.svg"
              sx={{
                height: 400,
              }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 6,
            }}
          >
            <NextLink href="/" passHref>
              <Button component="a" variant="outlined">
                Back to Home
              </Button>
            </NextLink>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Logout;
