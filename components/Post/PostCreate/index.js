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
  Grid,
} from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import LoadingButton from '@mui/lab/LoadingButton';
import QuillEditor from '../../QuillEditor';
import { createPost } from '../../../services/usersServices';
import hotToast from '../../../utils/hotToast';

const PostCreate = ({ categoryId, categoryTitle }) => {
  const [isLoading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      context: '',
      title: '',
    },
    validationSchema: Yup.object({
      context: Yup.string().max(5000),
      title: Yup.string().max(255).required(),
    }),
    onSubmit: async ({ title, context }) => {
      try {
        // NOTE: Make API request
        setLoading(true);
        const requestBody = {
          category: {
            id: categoryId,
            title: categoryTitle,
          },
          title,
          context: context.replace(/<p>|[</p>]/gi, ''),
          // headImg: '',
        };
        const response = await createPost(requestBody);
        setLoading(false);
        Router.push(`/post/${response.data}?categoryTitle=${categoryTitle}`);
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
        <form onSubmit={formik.handleSubmit}>
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={4} xs={12}>
                  <Typography variant="h6">Head Image</Typography>
                  <Typography
                    color="textSecondary"
                    variant="body2"
                    sx={{ mt: 1 }}
                  >
                    Set up the head image for your new post.
                  </Typography>
                </Grid>
                {/* upload image */}
              </Grid>
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
                onChange={(value) => {
                  formik.setFieldValue('context', value);
                }}
                placeholder="Write something"
                value={formik.values.context}
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
