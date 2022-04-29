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
import { passwordReset } from '../../services/Users';
import hotToast from '../../utils/hotToast';

type SubmitProps = {
  password: string;
  passwordConfirm: string;
  submit: boolean | null;
};

const PasswordReset = () => {
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { token } = router.query;
  dispatch(setJWTAction(decodeURI(token as string)));
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      password: '',
      passwordConfirm: '',
      submit: null,
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, 'must be at least 6 characters long')
        .max(16)
        .required('Password is required'),
      passwordConfirm: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Password is required'),
    }),
    onSubmit: (values: SubmitProps) => {
      const { password } = values;
      setLoading(true);
      try {
        passwordReset(password);
        router.replace('/');
        hotToast('success', 'Reset Password Success');
      } catch {
        setLoading(false);
        hotToast('error', 'Something went wrong!');
      }
    },
  });

  return (
    <>
      <Head>
        <title>Password Reset | ThinkMore Forum</title>
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
