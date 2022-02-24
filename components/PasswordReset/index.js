import React from 'react';
import Image from 'next/image';
import Head from 'next/head';
import NextLink from 'next/link';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  FormHelperText,
  TextField,
  Typography,
  Container,
  Card,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { passwordAction } from '../../store/actions/passwordAction';

const getToken = () => {
  // const currentUrl = typeof window !== 'undefined' && window.location.href;
  const currentUrl = new URL(
    'https://www.thinkmoreapp.com/password-reset?token=eyJhbGciOiJIUzM4NCJ9.eyJqdGkiOiIwM2M2MzUyNi05NDllLTExZWMtYmUxNi0yNzEzYmE1MTM4YTUiLCJzdWIiOiJtb2RlcmF0b3IiLCJhdWQiOiJ7fSIsImlhdCI6MTY0NTY3NTk0MywiZXhwIjoxNjQ1NzA3NjAwfQ.Y6L8RDOGhk-rYw5ba6ZVII1yANiXe59yvIcm7BLzyvCGxz3zN9IHzdSjt-kDNKhC',
  );
  const params = currentUrl.toString().split('password-reset?');
  return new URLSearchParams(params[1]).get('token');
};

const PasswordReset = () => {
  const dispatch = useDispatch();
  const { isLoading, errorMessage } = useSelector(
    (state) => state.passwordReset,
  );
  const jwtToken = getToken();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      password: '',
      passwordConfirm: '',
      submit: null,
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .matches(
          '(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$^&+=])(?=\\S+$).{6,16}',
          `Make sure password is between 8 characters  16 characters 
          including a number, 
          a lowercase letter, 
          an upper case letter, 
          a special character, 
          and no white space! `,
        )
        .required('Required'),
      passwordConfirm: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required'),
    }),
    onSubmit: async (values, helpers) => {
      dispatch(passwordAction(values.password));
      helpers.setErrors({ submit: errorMessage });
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
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                mt: 3,
              }}
            >
              <form noValidate onSubmit={formik.handleSubmit}>
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
                />
                <TextField
                  error={Boolean(
                    formik.touched.passwordConfirm &&
                      formik.errors.passwordConfirm,
                  )}
                  fullWidth
                  helperText={
                    formik.touched.passwordConfirm &&
                    formik.errors.passwordConfirm
                  }
                  label="Password Confirmation"
                  margin="normal"
                  name="passwordConfirm"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.passwordConfirm}
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

export default PasswordReset;
