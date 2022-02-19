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
} from '@mui/material';

const Register = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().max(20).required('Username is required'),
      email: Yup.string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      password: Yup.string().min(8).max(16).required('Password is required'),
    }),
    onSubmit: () => {
      router.push('/');
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
          <NextLink href="/" passHref>
            <a>
              <Typography align="center">
                <img alt="logo" src="/logo.svg" height="50" width="50" />
              </Typography>
            </a>
          </NextLink>
          <Box sx={{ my: 3 }}>
            <Typography
              color="textPrimary"
              variant="h4"
              align="center"
              sx={{ pb: 5 }}
            >
              Register
            </Typography>
            <TextField
              error={Boolean(formik.touched.username && formik.errors.username)}
              fullWidth
              helperText={formik.touched.username && formik.errors.username}
              label="Username"
              margin="normal"
              name="username"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="username"
              value={formik.values.username}
              variant="outlined"
            />
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
            <Grid sx={{ py: 3, pt: 7 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Register
              </Button>
            </Grid>
            <Divider />
          </Box>
          <Typography color="textSecondary" variant="body2">
            <NextLink href="/login">
              <Link
                variant="subtitle1"
                underline="hover"
                sx={{
                  cursor: 'pointer',
                }}
              >
                Having an account
              </Link>
            </NextLink>
          </Typography>
        </form>
      </Container>
    </Box>
  );
};

export default Register;
