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
} from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import LoadingButton from '@mui/lab/LoadingButton';
import QuillEditor from '../../QuillEditor';
import { postPost } from '../../../services/Post';
import upload from '../../../services/Img';
import hotToast from '../../../utils/hotToast';
import ImageDropZone from '../../ImageDropZone';
import fileToBase64 from '../../../utils/fileToBase64';

const PostCreate = ({ categoryTitle }) => {
  const [isLoading, setLoading] = useState(false);
  const [cover, setCover] = useState('/logo.svg');
  const [image, setImage] = useState(undefined);
  const formik = useFormik({
    initialValues: {
      context: '',
      title: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().max(255).required(),
    }),
    onSubmit: async ({ title, context }) => {
      if (!image) {
        hotToast('error', 'Please upload an image');
        return;
      }
      setLoading(true);
      const { data: headImg } = await upload(image);
      const response = await postPost({
        categoryTitle,
        title,
        context,
        headImgUrl: headImg.url,
      });
      setLoading(false);
      Router.push(`/post/${response.data}?categoryTitle=${categoryTitle}`);
      hotToast('success', 'Post created successfully');
    },
  });

  const handleRemove = () => {
    setCover(null);
  };

  const handleDropCover = async ([file]) => {
    const data = await fileToBase64(file);
    setImage(file);
    setCover(data);
  };

  const cancel = () => Router.back();
  return (
    <>
      <Head>
        <title>Create A New Post| ThinkMoreForum</title>
      </Head>
      <Container maxWidth="xl" sx={{ width: '900px' }} mx="300">
        <Typography variant="h4">Create a new post</Typography>
        <form onSubmit={formik.handleSubmit}>
          <Card sx={{ mt: 4, mb: 4 }}>
            <CardContent>
              <Typography variant="h6">Post cover</Typography>
              {cover ? (
                <Box
                  sx={{
                    backgroundImage: `url(${cover})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    borderRadius: 1,
                    height: 230,
                    mt: 3,
                  }}
                />
              ) : (
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    border: 1,
                    borderRadius: 1,
                    borderStyle: 'dashed',
                    borderColor: 'divider',
                    height: 230,
                    mt: 3,
                    p: 3,
                  }}
                >
                  <Typography align="center" color="textSecondary" variant="h6">
                    Select a cover image
                  </Typography>
                  <Typography
                    align="center"
                    color="textSecondary"
                    sx={{ mt: 1 }}
                    variant="subtitle1"
                  >
                    Image used for the post cover
                  </Typography>
                </Box>
              )}
              <Button onClick={handleRemove} sx={{ mt: 3 }} disabled={!cover}>
                Remove photo
              </Button>
              <Box sx={{ mt: 3 }}>
                <ImageDropZone
                  accept="image/jpg,image/png, image/jpeg"
                  maxFiles={1}
                  onDrop={handleDropCover}
                  maxSize={5242880}
                  minsize={0}
                />
              </Box>
            </CardContent>
          </Card>
          <Card sx={{ overflow: 'visible' }}>
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
