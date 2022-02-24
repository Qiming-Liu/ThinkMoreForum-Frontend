import React from 'react';
import Head from 'next/head';
import {
  Typography,
  Card,
  Container,
  CardContent,
  TextField,
  Button,
  Box,
  FormHelperText,
} from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import QuillEditor from '../../QuillEditor';

const PostCreate = (props) => {
  const formik = useFormik({
    initialValues: {
      description: '',
      name: '',
      submit: null,
    },
    validationSchema: Yup.object({
      description: Yup.string().max(5000),
      name: Yup.string().max(255).required(),
    }),
    onSubmit: async (values, helpers) => {
      try {
        // NOTE: Make API request
        console.log('hi');
      } catch (err) {
        console.error(err);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });
  return (
    <>
      <Head>
        <title>Create A New Post| ThinkMoreForum</title>
      </Head>
      <Container maxWidth="xl" sx={{ width: '900px' }} mx="300">
        <Typography variant="h4">Create a new post</Typography>
        <form onSubmit={formik.handleSubmit} {...props}>
          <Card>
            <CardContent>
              <Typography variant="h6">Basic details</Typography>
              <TextField
                error={Boolean(formik.touched.name && formik.errors.name)}
                fullWidth
                helperText={formik.touched.name && formik.errors.name}
                label="Post Name"
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.name}
                sx={{ width: '530px' }}
              />
              <Typography
                color="textSecondary"
                sx={{
                  mb: 2,
                  mt: 3,
                }}
                variant="subtitle2"
              >
                Description
              </Typography>
              <QuillEditor
                onChange={(value) => {
                  formik.setFieldValue('description', value);
                }}
                placeholder="Write something"
                sx={{ height: '300px' }}
                value={formik.values.description}
              />
              {Boolean(
                formik.touched.description && formik.errors.description,
              ) && (
                <Box sx={{ mt: 2 }}>
                  <FormHelperText error>
                    {formik.errors.description}
                  </FormHelperText>
                </Box>
              )}
            </CardContent>
          </Card>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              mx: -1,
              mb: -1,
              mt: 3,
            }}
          >
            <Button sx={{ m: 1 }} variant="outlined">
              Cancel
            </Button>
            <Button sx={{ m: 1 }} type="submit" variant="contained">
              Create
            </Button>
          </Box>
        </form>
      </Container>
    </>
  );
};

export default PostCreate;
