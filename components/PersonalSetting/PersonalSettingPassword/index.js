import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Box,
  FormHelperText,
} from '@mui/material';

const PersonalSettingPassword = (props) => {
  const [isEditing, setIsEditing] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      oldPassword: '',
      newPassword: '',
      submit: null,
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required('Required'),
      newPassword: Yup.string()
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
    }),
    onSubmit: () => {
      console.log('hi');
    },
  });

  return (
    <Card sx={{ mt: 4 }}>
      <CardContent>
        <form noValidate onSubmit={formik.handleSubmit} {...props}>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <Typography variant="h6" sx={{ marginTop: '20px' }}>
                Change password
              </Typography>
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
              <TextField
                error={Boolean(
                  formik.touched.oldPassword && formik.errors.oldPassword,
                )}
                fullWidth
                helperText={
                  formik.touched.oldPassword && formik.errors.oldPassword
                }
                size="small"
                label="Old Password"
                margin="normal"
                name="oldPassword"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="password"
                value={formik.values.oldPassword}
              />
              <TextField
                error={Boolean(
                  formik.touched.newPassword && formik.errors.newPassword,
                )}
                helperText={
                  formik.touched.newPassword && formik.errors.newPassword
                }
                sx={{
                  flexGrow: 1,
                  mr: 3,
                  ...(!isEditing && {
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderStyle: 'dotted',
                    },
                  }),
                }}
                size="small"
                label="New Password"
                margin="normal"
                name="newPassword"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="password"
                value={formik.values.newPassword}
              />
              {formik.errors.submit && (
                <Box sx={{ mt: 3 }}>
                  <FormHelperText error>{formik.errors.submit}</FormHelperText>
                </Box>
              )}
            </Grid>
            <Grid item md={2} xs={12}>
              <Button
                disabled={formik.isSubmitting}
                type="submit"
                sx={{ marginTop: '10px' }}
              >
                Edit
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default PersonalSettingPassword;
