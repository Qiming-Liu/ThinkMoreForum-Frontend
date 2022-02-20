import React from 'react';
import Image from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import {
  Box,
  Button,
  Container,
  FormHelperText,
  Grid,
  TextField,
  Typography,
  Divider,
} from '@mui/material';

import Login from '../Login';
import RegisterDialog from './RegisterDialog';

const Register = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      submit: null,
    },
    validationSchema: Yup.object({
      username: Yup.string().max(20).required('Username is required'),
      email: Yup.string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      password: Yup.string().min(8).max(16).required('Password is required'),
    }),
    onSubmit: async (values, helpers) => {
      axios
        .post(
          `http://localhost:8080/v1/users/signup/${values.email}/${values.username}/${values.password}`,
        )
        .then(() => {
          router.push('/');
        })
        .catch((error) => {
          if (
            error.response &&
            error.response.status === 503 &&
            error.response.data.message ===
              'could not execute statement; SQL [n/a]; constraint [users_email_key]; nested exception is org.hibernate.exception.ConstraintViolationException: could not execute statement'
          ) {
            helpers.setErrors({ submit: 'Email address already exists.' });
          }
          if (
            error.response &&
            error.response.status === 503 &&
            error.response.data.message ===
              'could not execute statement; SQL [n/a]; constraint [users_username_key]; nested exception is org.hibernate.exception.ConstraintViolationException: could not execute statement'
          ) {
            helpers.setErrors({ submit: 'Username already exists.' });
          }
          helpers.setStatus({ success: false });
          helpers.setSubmitting(false);
        });
    },
  });

  return (
    <RegisterDialog>
      <Box
        component="main"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100%',
          minWidth: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          my: 5,
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <NextLink href="/" passHref>
              <a href="/">
                <Typography align="center">
                  <Image alt="logo" src="/logo.svg" height="50" width="50" />
                </Typography>
              </a>
            </NextLink>
            <Typography color="textPrimary" variant="h4" sx={{ pb: 3 }}>
              Register
            </Typography>
          </Box>
          <Box>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                error={Boolean(
                  formik.touched.username && formik.errors.username,
                )}
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
              {formik.errors.submit && (
                <Box sx={{ mt: 3 }}>
                  <FormHelperText error>{formik.errors.submit}</FormHelperText>
                </Box>
              )}
              <Grid sx={{ pt: 3 }}>
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
            </form>
          </Box>
          <Divider sx={{ my: 3 }} />
          <Box
            sx={{
              alignItems: 'left',
            }}
          >
            <Login />
          </Box>
        </Container>
      </Box>
    </RegisterDialog>
  );
};

export default Register;
