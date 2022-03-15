import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Head from 'next/head';
import NextLink from 'next/link';
import { Box, Button, Typography, Dialog } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useSession } from 'next-auth/react';
import { thirdpartylogin } from '../../services/Public';
import loginAction from '../../store/actions/httpAction';
import hotToast from '../../utils/hotToast';

const LoginFacebook = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session } = useSession();
  const handleSubmit = () => {
    if (session) {
      router.replace('/');
      const { user, provider, providerAccountId } = session;
      thirdpartylogin(
        {
          oauthType: provider,
          openid: providerAccountId,
        },
        user.email,
        user.name,
      ).then(() => {
        hotToast('success', 'Facebook Login Success');
        dispatch(
          loginAction(
            user.email,
            providerAccountId,
            () => {},
            (fail) => {
              if (fail && fail.response && fail.response.status === 403) {
                hotToast('error', 'Invalid Email or Password');
              } else {
                hotToast('error', `something wrong${fail}`);
              }
            },
          ),
        );
      });
    }
  };

  return (
    <>
      <Head>
        <title>Facebook Login | ThinkMoreForum</title>
      </Head>
      <Dialog open fullWidth>
        <Box
          sx={{
            m: 3,
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
          <Typography variant="h4">Facebook Login Success</Typography>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
          }}
        >
          <Box sx={{ m: 3 }}>
            <Button
              fullWidth
              size="large"
              onClick={handleSubmit}
              variant="contained"
            >
              Back to Home Page
            </Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default LoginFacebook;
