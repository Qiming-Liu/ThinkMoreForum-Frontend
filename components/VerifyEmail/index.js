import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Head from 'next/head';
import NextLink from 'next/link';
import { useFormik } from 'formik';
import { Box, TextField, Typography, Container, Card } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useDispatch } from 'react-redux';
import { changeEmail } from '../../services/Users';
import { setEmailAction } from '../../store/actions/signAction';
import hotToast from '../../utils/hotToast';

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const { token } = router.query;
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: token,
      submit: null,
    },
    onSubmit: async (values) => {
      const { email } = values;
      setLoading(true);
      changeEmail(email)
        .then(() => {
          router.replace('/');
          hotToast('success', 'Verify New Email Success');
          dispatch(
            setEmailAction(
              email,
              () => {},
              (fail) => {
                hotToast('error', `something wrong${fail}`);
              },
            ),
          );
        })
        .catch((error) => {
          setLoading(false);
          hotToast('error', `Something wrong: ${error}`);
        });
    },
  });

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
              <Typography variant="h4">Verify Email</Typography>
              <Typography color="textSecondary" sx={{ mt: 2 }} variant="body2">
                Confirm your new email address
              </Typography>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                mt: 3,
              }}
            >
              <form noValidate onSubmit={formik.handleSubmit}>
                <TextField
                  fullWidth
                  label="New Email Address"
                  margin="normal"
                  name="email"
                  type="email"
                  InputLabelProps={{ shrink: !!token }}
                  value={formik.values.email}
                />
                <Box sx={{ mt: 3 }}>
                  <LoadingButton
                    disabled={formik.isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    loading={isLoading}
                  >
                    Verify Email
                  </LoadingButton>
                </Box>
              </form>
            </Box>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default VerifyEmail;
