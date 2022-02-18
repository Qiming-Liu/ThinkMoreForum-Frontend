import React from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Password = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      comfirmedPassword: '',
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string()
        .matches(
          '(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$^&+=])(?=\\S+$).{8,16}',
          'Must be a valid password',
        )
        .max(255)
        .required('Old Password is required'),
      newPassword: Yup.string()
        .matches(
          '(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$^&+=])(?=\\S+$).{8,16}',
          'Must be a valid password',
        )
        .max(255)
        .required('New Password is required'),
      comfirmedPassword: Yup.string()
        .matches(
          '(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$^&+=])(?=\\S+$).{8,16}',
          'Must be a valid password',
        )
        .max(255)
        .required('Comfirmed Password is required'),
    }),
    onSubmit: () => {
      router.push('/');
    },
  });

  return (
    <>
      <Head>
        <title>Change Password | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%',
        }}
      >
        <Container maxWidth="sm">
          <NextLink href="/" passHref>
            <Button
              component="a"
              startIcon={<ArrowBackIcon fontSize="small" />}
            >
              Dashboard
            </Button>
          </NextLink>
          <form onSubmit={formik.handleSubmit}>
            <NextLink href="/" passHref>
              <Typography align="center">
                <img src="/logo.svg" height="50" width="50" alt="logo" />
              </Typography>
            </NextLink>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Password Reset
              </Typography>
            </Box>
            <TextField
              error={Boolean(
                formik.touched.oldPassword && formik.errors.oldPassword,
              )}
              fullWidth
              helperText={
                formik.touched.oldPassword && formik.errors.oldPassword
              }
              label="Old Password"
              margin="normal"
              name="oldPassword"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.oldPassword}
              variant="outlined"
            />
            <TextField
              error={Boolean(
                formik.touched.newPassword && formik.errors.newPassword,
              )}
              fullWidth
              helperText={
                formik.touched.newPassword && formik.errors.newPassword
              }
              label="New Password"
              margin="normal"
              name="newPassword"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.newPassword}
              variant="outlined"
            />
            <TextField
              error={Boolean(
                formik.touched.comfirmedPassword &&
                  formik.errors.comfirmedPassword,
              )}
              fullWidth
              helperText={
                formik.touched.comfirmedPassword &&
                formik.errors.comfirmedPassword
              }
              label="Comfirm Passowrd"
              margin="normal"
              name="comfirmedPassword"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.comfirmedPassword}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Reset Password
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Password;
