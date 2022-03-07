import React, { useState } from 'react';
import Image from 'next/image';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
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
import Yup from '../../utils/yupValidation';
import hotToast from '../../utils/hotToast';
import { register, uniqueUsername, uniqueEmail } from '../../services/Public';
import loginAction from '../../store/actions/httpAction';

const Register = ({ login }) => {
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string().sequence([
        () =>
          Yup.string()
            .email('Must be a valid email')
            .max(255)
            .required('Email is required'),
        () => Yup.string().unique('Email is already in use', uniqueEmail),
      ]),
      username: Yup.string().sequence([
        () => Yup.string().max(20).required('Username is required'),
        () => Yup.string().unique('Username is already taken', uniqueUsername),
      ]),
      password: Yup.string()
        .min(6, 'must be at least 6 characters long')
        .max(16)
        .required('Password is required'),
    }),
    onSubmit: async (values) => {
      const { email, username, password } = values;
      setLoading(true);
      register(email, username, password)
        .then(() => {
          hotToast('success', 'Register Success');
          // auto login
          dispatch(
            loginAction(
              email,
              password,
              () => {},
              (fail) => {
                setLoading(false);
                if (fail && fail.response && fail.response.status === 403) {
                  hotToast('error', 'Invalid Email or Password');
                }
                hotToast('error', `something wrong${fail}`);
              },
            ),
          );
        })
        .catch((error) => {
          setLoading(false);
          hotToast('error', `Something wrong: ${error}`);
        });
    },
  });

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
            Register
          </Typography>
          <Typography
            color="textSecondary"
            sx={{ mt: 2 }}
            variant="body2"
            align="center"
          >
            Where the Discovering Starts
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
            <Grid sx={{ pt: 11 }}>
              <LoadingButton
                loading={isLoading}
                disabled={formik.isSubmitting}
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Register
              </LoadingButton>
            </Grid>
            <br />
            <Divider />
          </Box>
          <Typography color="textSecondary" variant="body2">
            <Button onClick={() => login()}>Having an account</Button>
          </Typography>
        </form>
      </Container>
    </Box>
  );
};

export default Register;
