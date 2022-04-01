import React, { useEffect, useState } from 'react';
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
  changeHeadImg,
  sendVerificationEmail,
} from '../../services/Users';
import {
  setHeadImgAction,
  setUsernameAction,
  setEmailAction,
} from '../../store/actions/signAction';
import UserCircleIcon from '../../icons/user-circle';
import ImgDropzone from '../ImgDropzone';

const Form = (props) => {
  const dispatch = useDispatch();
  const { myDetail } = useSelector((state) => state.sign);
  const [headImg, setHeadImg] = useState('');
  const [name, setName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const [usernameLock, setUsernameLock] = useState(true);
  const [emailLock, setEmailLock] = useState(true);

  useEffect(() => {
    if (myDetail) {
      setName(myDetail.username);
      setUserEmail(myDetail.email);
    }
  }, [myDetail]);

  const formikUsername = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: name,
      submit: null,
    },
    validationSchema: Yup.object({
      username: Yup.string().sequence([
        () => Yup.string().max(20).required('Required'),
        () => Yup.string().unique('Username is already taken', uniqueUsername),
      ]),
    }),
    onSubmit: (values) => {
      changeUsername(values.username)
        .then(() => {
          setUsernameLock(true);
          hotToast('success', 'Username is changed');
          dispatch(setUsernameAction(values.username));
        })
        .catch(() => {
          hotToast('error', 'Username is already taken');
        });
    },
  });

  const formikEmail = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: userEmail,
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string().sequence([
        () =>
          Yup.string()
            .email('Must be a valid email')
            .max(255)
            .required('Required'),
        () => Yup.string().unique('Email is already in use', uniqueEmail),
      ]),
    }),
    onSubmit: (values) => {
      if (values.email === formikEmail.initialValues.email) {
        setEmailLock(true);
        return;
      }
      sendVerificationEmail(values.email)
        .then(() => {
          setEmailLock(true);
          hotToast('success', 'Verification email is sent');
          dispatch(setEmailAction(values.email));
        })
        .catch(() => {
          hotToast('error', 'Email is already in use');
        });
    },
  });

  const handleCropImg = async (base64) => {
    setHeadImg(base64);
    const file = await (await fetch(base64)).blob();
    const { data: img } = await upload(file).catch((error) => {
      hotToast('error', `Something wrong: ${error}`);
    });
    changeHeadImg({ headImgUrl: img.url })
      .then(() => {
        dispatch(
          setHeadImgAction(
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

  if (!myDetail) {
    return null;
  }
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
                    src={headImg || myDetail.headImgUrl}
                    sx={{
                      height: 64,
                      mr: 2,
                      width: 64,
                    }}
                  >
                    <UserCircleIcon fontSize="small" />
                  </Avatar>
                  <ImgDropzone
                    accept="image/jpg,image/png, image/jpeg"
                    afterCrop={handleCropImg}
                    aspectRatio={1}
                  >
                    <Button>Change</Button>
                  </ImgDropzone>
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
                      defaultValue={formikUsername.initialValues}
                      value={formikUsername.values.username}
                      name="username"
                      label="Username"
                      size="small"
                      sx={{
                        flexGrow: 1,
                        mr: 3,
                      }}
                      disabled={usernameLock}
                    />
                    {usernameLock ? (
                      <Button
                        disabled={formikUsername.isSubmitting}
                        onClick={(e) => {
                          e.preventDefault();
                          setUsernameLock(false);
                        }}
                      >
                        Edit
                      </Button>
                    ) : (
                      <Button
                        disabled={formikUsername.isSubmitting}
                        onClick={(e) => {
                          e.preventDefault();
                          if (
                            formikUsername.values.username === myDetail.username
                          ) {
                            setUsernameLock(true);
                          } else {
                            formikUsername.submitForm();
                          }
                        }}
                      >
                        Save
                      </Button>
                    )}
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
                      defaultValue={formikEmail.initialValues}
                      value={formikEmail.values.email}
                      label="Email Address"
                      name="email"
                      size="small"
                      sx={{
                        flexGrow: 1,
                        mr: 3,
                      }}
                      disabled={emailLock}
                    />
                    {emailLock ? (
                      <Button
                        disabled={formikEmail.isSubmitting}
                        onClick={(e) => {
                          e.preventDefault();
                          setEmailLock(false);
                        }}
                      >
                        Edit
                      </Button>
                    ) : (
                      <Button
                        disabled={formikEmail.isSubmitting}
                        onClick={(e) => {
                          e.preventDefault();
                          if (formikEmail.values.email === myDetail.email) {
                            setEmailLock(true);
                          } else {
                            formikEmail.submitForm();
                          }
                        }}
                      >
                        Save
                      </Button>
                    )}
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
