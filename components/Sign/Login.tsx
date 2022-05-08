import React, { useState } from 'react';
import Image from 'next/image';
import Router from 'next/router';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Divider,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import loginAction from '../../store/actions/httpAction';
import { closeSignDialog } from '../../store/actions/signAction';
import hotToast from '../../utils/hotToast';

const Login = ({ register }: { register: any }) => {
  const [isLoading, setLoading] = useState(false);
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
      password: Yup.string()
        .min(6, 'must be at least 6 characters long')
        .max(16)
        .required('Password is required'),
    }),
    onSubmit: (values) => {
      const { email, password } = values;
      setLoading(true);
      dispatch(
        loginAction(
          email,
          password,
          () => {
            hotToast('success', 'Login Success');
          },
          (fail: any) => {
            setLoading(false);
            if (fail && fail.response && fail.response.status === 403) {
              hotToast('error', 'Invalid Email or Password');
            } else {
              hotToast('error', `Something wrong ${fail}`);
            }
          },
        ),
      );
    },
  });
  const resetPassword = () => {
    dispatch(closeSignDialog());
    Router.push('/password-email');
  };

  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
        minWidth: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="md">
        <form onSubmit={formik.handleSubmit}>
          <Typography align="center">
            <Image src="/logo.png" height="55" width="55" alt="logo" />
          </Typography>
          <Typography color="textPrimary" variant="h4" align="center">
            Log in
          </Typography>
          <Typography
            color="textSecondary"
            sx={{ mt: 2 }}
            variant="body2"
            align="center"
          >
            Where the Exploration Begins
          </Typography>
          <Box sx={{ my: 4 }}>
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
            <Grid sx={{ py: 3 }}>
              <LoadingButton
                loading={isLoading}
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Login
              </LoadingButton>
            </Grid>
            <Divider />
            <Box sx={{ pt: 1 }}>
              <Typography color="textSecondary" variant="body2">
                <Button onClick={() => register()}>Create a new account</Button>
              </Typography>
              <Typography color="textSecondary" variant="body2">
                <Button onClick={resetPassword}>Forgot your password?</Button>
              </Typography>
            </Box>
          </Box>
        </form>
      </Container>
    </Box>
  );
};

export default Login;
