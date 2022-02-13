import React from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  Divider,
  Alert,
} from '@mui/material';
import { Facebook as FacebookIcon } from '../../public/icon/facebook';
import { Google as GoogleIcon } from '../../public/icon/google';
import { borderRadius } from '@mui/system';

const Login = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      password: Yup.string().max(255).required('Password is required'),
    }),
    onSubmit: () => {
      router.push('/');
    },
  });

  return (
    <>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%',
          minWidth: '100%',
        }}
      >
        <Container maxWidth="md">
          <form onSubmit={formik.handleSubmit}>
            <NextLink href="/" passHref>
              <a>
                <Typography align="center">
                  <img src="/logo.svg" height="50" width="50" />
                </Typography>
              </a>
            </NextLink>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4" align="center">
                Sign in
              </Typography>

              <TextField
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
                variant="outlined"
              />
              <TextField
                error={Boolean(
                  formik.touched.password && formik.errors.password,
                )}
                fullWidth
                helperText={formik.touched.password && formik.errors.password}
                label="Password"
                margin="normal"
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="password"
                value={formik.values.password}
                variant="outlined"
              />
              <Grid sx={{ py: 2 }}>
                <Button
                  color="primary"
                  disabled={formik.isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  sx={{ borderRadius: 3 }}
                >
                  Login
                </Button>
              </Grid>
              <Box sx={{ mt: 2 }}>
                <Alert severity="info" sx={{ borderRadius: 3 }}>
                  <div>
                    You can use <b>demo@devias.io</b> and password{' '}
                    <b>Password123!</b>
                  </div>
                </Alert>
              </Box>
              <br />
              <Divider />
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Button
                  color="info"
                  fullWidth
                  startIcon={<FacebookIcon />}
                  onClick={formik.handleSubmit}
                  size="large"
                  variant="contained"
                  sx={{ borderRadius: 3 }}
                >
                  Login with Facebook
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  fullWidth
                  color="error"
                  startIcon={<GoogleIcon />}
                  onClick={formik.handleSubmit}
                  size="large"
                  variant="contained"
                  sx={{ borderRadius: 3 }}
                >
                  Login with Google
                </Button>
              </Grid>
            </Grid>
            <Box
              sx={{
                pb: 1,
                pt: 3,
              }}
            ></Box>
            <Typography color="textSecondary" variant="body2">
              <NextLink href="/password">
                <Link
                  variant="subtitle1"
                  underline="hover"
                  sx={{
                    cursor: 'pointer',
                  }}
                >
                  Forgot your password?
                </Link>
              </NextLink>
            </Typography>

            <Typography color="textSecondary" variant="body2">
              <NextLink href="/register">
                <Link
                  variant="subtitle1"
                  underline="hover"
                  sx={{
                    cursor: 'pointer',
                  }}
                >
                  Sign Up
                </Link>
              </NextLink>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;
