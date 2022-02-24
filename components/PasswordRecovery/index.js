import React, { useState } from 'react';
import Image from 'next/image';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Head from 'next/head';
import NextLink from 'next/link';
import {
  Box,
  Card,
  FormHelperText,
  TextField,
  Container,
  Typography,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { resetPasswordemail } from '../../services/usersServices';

const PasswordRecovery = (props) => {
  const [isLoading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: '',
      success: '',
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      await resetPasswordemail(values.email);
      setLoading(false);
    },
  });

  return (
    <>
      <Head>
        <title>Password Reset | ThinkMoreForum</title>
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
              <Typography variant="h4">Password Reset</Typography>
              <Typography color="textSecondary" sx={{ mt: 2 }} variant="body2">
                Tell us your email so we can send you a reset link
              </Typography>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                mt: 3,
              }}
            >
              <form noValidate onSubmit={formik.handleSubmit} {...props}>
                <TextField
                  autoFocus
                  error={Boolean(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                />
                {formik.errors.submit && (
                  <Box sx={{ mt: 3 }}>
                    <FormHelperText error>
                      {formik.errors.submit}
                    </FormHelperText>
                  </Box>
                )}
                <Box sx={{ mt: 3 }}>
                  <LoadingButton
                    disabled={formik.isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    loading={isLoading}
                  >
                    Reset Password
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

export default PasswordRecovery;
