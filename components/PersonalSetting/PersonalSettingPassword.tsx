import { useFormik } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import {
  FormHelperText,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Box,
} from '@mui/material';
import hotToast from '../../utils/hotToast';
import { changePassword } from '../../services/Users';

type submitProps = {
  oldPassword: string;
  newPassword: string;
  submit: boolean | null;
};

const PersonalSettingPassword = () => {
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
        .min(6, 'must be at least 6 characters long')
        .max(16)
        .required('Required'),
    }),
    onSubmit: async (values: submitProps) => {
      const { oldPassword, newPassword } = values;
      await changePassword({ oldPassword, newPassword })
        .then(() => {
          hotToast('success', 'Password is changed');
        })
        .catch(() => {
          hotToast('error', `Old password does not match`);
        });
    },
  });

  return (
    <Card>
      <CardContent>
        <form noValidate onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <Typography variant="h6">Change password</Typography>
            </Grid>
            <Grid item md={8} xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  error={Boolean(
                    formik.touched.oldPassword && formik.errors.oldPassword,
                  )}
                  sx={{ flexGrow: 1, mr: 11 }}
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
              </Box>
              <Box sx={{ display: 'flex', mt: 1, alignItems: 'center' }}>
                <TextField
                  error={Boolean(
                    formik.touched.newPassword && formik.errors.newPassword,
                  )}
                  helperText={
                    formik.touched.newPassword && formik.errors.newPassword
                  }
                  sx={{ flexGrow: 1, mr: 3 }}
                  size="small"
                  label="New Password"
                  name="newPassword"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.newPassword}
                />
                {formik.errors.submit && (
                  <Box sx={{ mt: 3 }}>
                    <FormHelperText error>
                      {formik.errors.submit}
                    </FormHelperText>
                  </Box>
                )}
                <Button
                  disabled={formik.isSubmitting}
                  type="submit"
                  sx={{ marginTop: '10px' }}
                >
                  Save
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default PersonalSettingPassword;
