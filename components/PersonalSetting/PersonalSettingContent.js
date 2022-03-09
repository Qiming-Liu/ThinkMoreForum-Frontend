import * as React from 'react';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import Yup from '../../utils/yupValidation';
import hotToast from '../../utils/hotToast';
import PersonalSettingPassword from './PersonalSettingPassword';
import { uniqueUsername, uniqueEmail } from '../../services/Public';
import {
  getMyUser,
  changeUsername,
  sendVerificationEmail,
} from '../../services/Users';

const Form = (props) => {
  const [details, setDetails] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await getMyUser();
      setDetails(data);
    })();
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: details.username,
      submit: null,
    },
    validationSchema: Yup.object({
      username: Yup.string().sequence([
        () => Yup.string().max(20),
        () => Yup.string().unique('Username is already taken', uniqueUsername),
      ]),
    }),
    onSubmit: async (values) => {
      await changeUsername(values.username)
        .then(() => {
          hotToast('success', 'Change Username Success');
        })
        .catch((error) => {
          hotToast('error', `Something wrong: ${error}`);
        });
    },
  });

  const formikEmail = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: details.email,
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string().sequence([
        () => Yup.string().email('Must be a valid email').max(255),
        () => Yup.string().unique('Email is already in use', uniqueEmail),
      ]),
    }),
    onSubmit: async (values) => {
      await sendVerificationEmail(values.email)
        .then(() => {
          hotToast('success', 'Verification Email Sent');
        })
        .catch((error) => {
          hotToast('error', `Something wrong: ${error}`);
        });
    },
  });

  const user = {
    avatar: '/static/mock-images/avatars/avatar-anika_visser.png',
  };
  return (
    <Grid sx={{ mt: 1 }} {...props} container direction="column" spacing={5}>
      <Grid item>
        <Typography sx={{ mb: 3 }} variant="h4">
          Settings
        </Typography>
        <Card item>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={4} xs={12}>
                <Typography variant="h6">Basic details</Typography>
              </Grid>
              <Grid item md={8} xs={12}>
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                  }}
                >
                  <Avatar
                    src={user.avatar}
                    sx={{
                      height: 64,
                      mr: 2,
                      width: 64,
                    }}
                  >
                    <div>goodddd</div>
                  </Avatar>
                  <Button>Change</Button>
                </Box>

                <form onSubmit={formik.handleSubmit}>
                  <Box
                    sx={{
                      display: 'flex',
                      mt: 3,
                      alignItems: 'center',
                    }}
                  >
                    <TextField
                      error={Boolean(
                        formik.touched.username && formik.errors.username,
                      )}
                      helperText={
                        formik.touched.username && formik.errors.username
                      }
                      InputLabelProps={{ shrink: !!details }}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      name="username"
                      label="Username"
                      size="small"
                      sx={{
                        flexGrow: 1,
                        mr: 3,
                      }}
                    />
                    <Button disabled={formik.isSubmitting} type="submit">
                      Save
                    </Button>
                  </Box>
                </form>
                <form onSubmit={formikEmail.handleSubmit}>
                  <Box
                    sx={{
                      display: 'flex',
                      mt: 3,
                      alignItems: 'center',
                    }}
                  >
                    <TextField
                      error={Boolean(
                        formikEmail.touched.email && formikEmail.errors.email,
                      )}
                      helperText={
                        formikEmail.touched.email && formikEmail.errors.email
                      }
                      InputLabelProps={{ shrink: !!details }}
                      onBlur={formikEmail.handleBlur}
                      onChange={formikEmail.handleChange}
                      value={formikEmail.values.email}
                      label="Email Address"
                      name="email"
                      size="small"
                      sx={{
                        flexGrow: 1,
                        mr: 3,
                      }}
                    />
                    <Button disabled={formikEmail.isSubmitting} type="submit">
                      Send
                    </Button>
                  </Box>
                </form>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item>
        <PersonalSettingPassword />
      </Grid>
    </Grid>
  );
};

export default Form;
