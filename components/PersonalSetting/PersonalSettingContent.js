import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
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
import hotToast from '../../utils/hotToast';
import PersonalSettingPassword from './PersonalSettingPassword';
import upload from '../../services/Img';
import { uniqueUsername, uniqueEmail } from '../../services/Public';
import {
  changeUsername,
  changeProfileImg,
  sendVerificationEmail,
} from '../../services/Users';
import {
  setProfileImgAction,
  setUsernameAction,
} from '../../store/actions/signAction';
import UserCircleIcon from '../../icons/user-circle';
import fileToBase64 from '../../utils/fileToBase64';
import ChangePicButton from './ChangePicButton';

const Form = (props) => {
  const dispatch = useDispatch();
  const { myDetail } = useSelector((state) => state.sign);
  const [profileImg, setProfileImg] = useState(myDetail.profileImgUrl);

  const formikUsername = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: myDetail.username || '',
      submit: null,
    },
    validationSchema: Yup.object({
      username: Yup.string().sequence([
        () => Yup.string().max(20),
        () => Yup.string().unique('Username is already taken', uniqueUsername),
      ]),
    }),
    onSubmit: async (username) => {
      changeUsername(username)
        .then(() => {
          hotToast('success', 'Username is changed');
          dispatch(
            setUsernameAction(
              username,
              () => {},
              (fail) => {
                hotToast('error', `Something wrong: ${fail}`);
              },
            ),
          );
        })
        .catch((error) => {
          hotToast('error', `Something wrong: ${error}`);
        });
    },
  });

  const formikEmail = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: myDetail.email || '',
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string().sequence([
        () => Yup.string().email('Must be a valid email').max(255),
        () => Yup.string().unique('Email is already in use', uniqueEmail),
      ]),
    }),
    onSubmit: async (email) => {
      await sendVerificationEmail(email)
        .then(() => {
          hotToast('success', 'Verification email is sent');
        })
        .catch((error) => {
          hotToast('error', `Something wrong: ${error}`);
        });
    },
  });

  const handleDropCover = async ([file]) => {
    const data = await fileToBase64(file);
    setProfileImg(data);
    const { data: img } = await upload(file).catch((error) => {
      hotToast('error', `Something wrong: ${error}`);
    });
    changeProfileImg(img.url)
      .then(() => {
        hotToast('success', 'Profile picture is changed');
        dispatch(
          setProfileImgAction(
            img.url,
            () => {},
            (fail) => {
              hotToast('error', `something wrong${fail}`);
            },
          ),
        );
      })
      .catch((error) => {
        hotToast('error', `Something wrong: ${error}`);
      });
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
                    src={profileImg}
                    sx={{
                      height: 64,
                      mr: 2,
                      width: 64,
                    }}
                  >
                    <UserCircleIcon fontSize="small" />
                  </Avatar>
                  <ChangePicButton
                    accept="image/jpg,image/png, image/jpeg"
                    maxFiles={1}
                    onDrop={handleDropCover}
                    maxSize={5242880}
                    minsize={0}
                  />
                </Box>

                <form onSubmit={formikUsername.handleSubmit}>
                  <Box
                    sx={{
                      display: 'flex',
                      mt: 3,
                      alignItems: 'center',
                    }}
                  >
                    <TextField
                      error={Boolean(
                        formikUsername.touched.username &&
                          formikUsername.errors.username,
                      )}
                      helperText={
                        formikUsername.touched.username &&
                        formikUsername.errors.username
                      }
                      InputLabelProps={{ shrink: !!myDetail }}
                      onBlur={formikUsername.handleBlur}
                      onChange={formikUsername.handleChange}
                      value={formikUsername.values.username}
                      name="username"
                      label="Username"
                      size="small"
                      sx={{
                        flexGrow: 1,
                        mr: 3,
                      }}
                    />
                    <Button
                      disabled={formikUsername.isSubmitting}
                      type="submit"
                    >
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
                      InputLabelProps={{ shrink: !!myDetail }}
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
