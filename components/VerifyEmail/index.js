import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Head from 'next/head';
import NextLink from 'next/link';
import { Box, Button, Typography, Container, Card } from '@mui/material';
import { useDispatch } from 'react-redux';
import { changeEmail } from '../../services/Users';
import { setEmailAction } from '../../store/actions/signAction';
import hotToast from '../../utils/hotToast';

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { token } = router.query;
  const handleSubmit = () => {
    changeEmail(token)
      .then(() => {
        router.replace('/');
        hotToast('success', 'Email address has changed.');
        dispatch(
          setEmailAction(
            token,
            () => {},
            (fail) => {
              hotToast('error', `something wrong${fail}`);
            },
          ),
        );
      })
      .catch((error) => {
        hotToast('error', `Something wrong: ${error}`);
      });
  };

  return (
    <>
      <Head>
        <title>Email Verification | ThinkMoreForum</title>
      </Head>
      <Box
        component="main"
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            py: {
              xs: '60px',
              md: '120px',
            },
          }}
        >
          <Card elevation={16} sx={{ p: 4 }}>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <NextLink href="/" passHref>
                <Typography align="center">
                  <Image src="/logo.svg" height="50" width="50" alt="logo" />
                </Typography>
              </NextLink>
              <Typography variant="h4">New Email Address</Typography>
              <Typography color="textSecondary" sx={{ mt: 2 }} variant="body2">
                Changing to {token}
              </Typography>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                mt: 3,
              }}
            >
              <Box sx={{ mt: 3 }}>
                <Button
                  fullWidth
                  size="large"
                  onClick={handleSubmit}
                  variant="contained"
                >
                  Confirm
                </Button>
              </Box>
            </Box>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default VerifyEmail;
