import React from 'react';
import Image from 'next/image';
import { useFormik } from 'formik';
import * as Yup from 'yup';
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
import LoadingButton from '@mui/lab/LoadingButton';
import hotToast from '../../utils/hotToast';
import { signIn } from 'next-auth/react';

const Register = ({ login }) => {
  const [isLoading, setLoading] = useState(false);
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
      password: Yup.string()
        .min(6, 'must be at least 6 characters long')
        .max(255)
        .required('Password is required'),
    }),
    onSubmit: async (values) => {
      const { username, email, password } = values;
      setLoading(true);
      // signIn(username, email, password)
      // .then(() => {

      //   .then(() => {
      //     router.push('/profile');
      //   })
      //   .catch((error) => {
      //     if (
      //       error.response &&
      //       error.response.status === 503 &&
      //       error.response.data.message ===
      //         'could not execute statement; SQL [n/a]; constraint [users_email_key]; nested exception is org.hibernate.exception.ConstraintViolationException: could not execute statement'
      //     ) {
      //       helpers.setErrors({ submit: 'Email address already exists.' });
      //     }
      //     if (
      //       error.response &&
      //       error.response.status === 503 &&
      //       error.response.data.message ===
      //         'could not execute statement; SQL [n/a]; constraint [users_username_key]; nested exception is org.hibernate.exception.ConstraintViolationException: could not execute statement'
      //     ) {
      //       helpers.setErrors({ submit: 'Username already exists.' });
      //     }
      //     helpers.setStatus({ success: false });
      //     helpers.setSubmitting(false);
      //   });
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
          <Typography align="center">
            <Image alt="logo" src="/logo.svg" height="50" width="50" />
          </Typography>
          <Typography color="textPrimary" variant="h4" sx={{ pb: 3 }}>
            Register
          </Typography>
        </Box>
        <Box>
          <form onSubmit={formik.handleSubmit}>
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
        <Typography color="textSecondary" variant="body2">
          <Button onClick={() => login()}>Log in</Button>
        </Typography>
      </Container>
    </Box>
  );
};

export default Register;
