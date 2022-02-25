import React, { useState } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import {
  Typography,
  Card,
  Container,
  CardContent,
  TextField,
  Button,
  Box,
  FormHelperText,
  MenuItem,
} from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import LoadingButton from '@mui/lab/LoadingButton';
import QuillEditor from '../../QuillEditor';
import { createPost } from '../../../services/usersServices';
import hotToast from '../../../utils/hotToast';

const categoryOptions = [
  {
    label: 'Default',
    value: 'Default Category',
  },
  {
    label: '1',
    value: 'category 1',
  },
  {
    label: '2',
    value: 'category2',
  },
];

const PostCreate = (props) => {
  const [isLoading, setLoading] = useState(false);
  const [context, setContext] = useState('write something');
  const formik = useFormik({
    initialValues: {
      context: '',
      title: '',
      category: '',
    },
    validationSchema: Yup.object({
      context: Yup.string().max(5000),
      title: Yup.string().max(255).required(),
      category: Yup.string().max(255),
    }),
    onSubmit: async (values) => {
      try {
        // NOTE: Make API request
        setLoading(true);
        const requestBody = {
          category: {
            id: '03ce9d2e-949e-11ec-be16-8fbcfc042c46',
            title: values.category,
          },
          title: values.title,
          context: values.context,
        };
        console.log(context);
        // await createPost(requestBody);
        // setLoading(false);
        // Router.push('/');
      } catch (err) {
        setLoading(false);
        hotToast('failure', err.response.data.message);
      }
    },
  });

  const cancel = () => Router.back();
  return (
    <>
      <Head>
        <title>Create A New Post| ThinkMoreForum</title>
      </Head>
      <Container maxWidth="xl" sx={{ width: '900px' }} mx="300">
        <Typography variant="h4">Create a new post</Typography>
        <form onSubmit={formik.handleSubmit} {...props}>
          <Card sx={{ mt: 3 }}>
            <CardContent sx={{ width: '530px' }}>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Category
              </Typography>
              <TextField
                error={Boolean(
                  formik.touched.category && formik.errors.category,
                )}
                fullWidth
                label="Category"
                name="category"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                select
                value={formik.values.category}
              >
                {categoryOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                disabled
                error={Boolean(formik.touched.barcode && formik.errors.barcode)}
                fullWidth
                label="Barcode"
                name="barcode"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                sx={{ mt: 2 }}
                value={formik.values.barcode}
              />
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Basic details
              </Typography>
              <TextField
                error={Boolean(formik.touched.title && formik.errors.title)}
                fullWidth
                helperText={formik.touched.title && formik.errors.title}
                label="Post Title"
                name="title"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.title}
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
                Context
              </Typography>
              <QuillEditor
                onChange={setContext}
                value={context}
                style={{ height: '300px' }}
              />
              {Boolean(formik.touched.context && formik.errors.context) && (
                <Box sx={{ mt: 2 }}>
                  <FormHelperText error>{formik.errors.context}</FormHelperText>
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
            <Button sx={{ m: 1 }} variant="outlined" onClick={cancel}>
              Cancel
            </Button>
            <LoadingButton
              sx={{ m: 1 }}
              type="submit"
              variant="contained"
              loading={isLoading}
            >
              Create
            </LoadingButton>
          </Box>
        </form>
      </Container>
    </>
  );
};

export default PostCreate;
