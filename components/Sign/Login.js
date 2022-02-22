import React from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { signIn } from 'next-auth/react';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  Divider,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import FacebookIcon from '../../icons/facebook';
import GoogleIcon from '../../icons/google';
import { loginAction } from '../../store/actions/signAction';

const Login = ({ register }) => {
  const { isLoading, errorMessage } = useSelector((state) => state.jwt);
  const dispatch = useDispatch();
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
    onSubmit: async (values, helpers) => {
      dispatch(loginAction(values.email, values.password));
      helpers.setErrors({ submit: errorMessage });
    },
  });

  return (
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
          <Typography align="center">
            <Image src="/logo.svg" height="50" width="50" alt="logo" />
          </Typography>
          <Box sx={{ my: 3 }}>
            <Typography color="textPrimary" variant="h4" align="center">
              Log in
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
              error={Boolean(formik.touched.password && formik.errors.password)}
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
              <LoadingButton
                loading={isLoading}
                disabled={formik.isSubmitting}
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Login
              </LoadingButton>
            </Grid>
            <br />
            <Divider />
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Button
                startIcon={<FacebookIcon />}
                onClick={() => signIn('facebook')}
                color="info"
                fullWidth
                size="large"
                variant="contained"
              >
                Login with Facebook
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                startIcon={<GoogleIcon />}
                onClick={() => signIn('google')}
                fullWidth
                color="error"
                size="large"
                variant="contained"
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
          />
          <Typography color="textSecondary" variant="body2">
            <Button onClick={() => register()}>Create a new account</Button>
          </Typography>
          <Typography color="textSecondary" variant="body2">
            <NextLink href="/password-email" passHref>
              <Link
                href="/password-email"
                variant="subtitle1"
                underline="hover"
              >
                Forgot your password?
              </Link>
            </NextLink>
          </Typography>
        </form>
      </Container>
    </Box>
  );
};

export default Login;
