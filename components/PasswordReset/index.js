import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Head from 'next/head';
import NextLink from 'next/link';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  Box,
  FormHelperText,
  TextField,
  Typography,
  Container,
  Card,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { setJWTAction } from '../../store/actions/signAction';
import { resetPassword } from '../../services/usersServices';
import hotToast from '../../utils/hotToast';

const PasswordReset = () => {
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { token } = router.query;
  dispatch(setJWTAction(decodeURI(token)));
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
          `Make sure password is between 6 characters 16 characters 
          including a number, 
          a lowercase letter, 
          an upper case letter, 
          a special character, 
          and no white space!`,
        )
        .required('Password is required'),
      passwordConfirm: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Password is required'),
    }),
    onSubmit: async (values) => {
      const { password } = values;
      setLoading(true);
      await resetPassword(password)
        .then(() => {
          setLoading(false);
          hotToast('success', 'Reset Password Success');
          // success
        })
        .catch((error) => {
          setLoading(false);
          hotToast('success', error.response.data.message);
        });
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
