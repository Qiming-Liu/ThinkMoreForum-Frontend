import React, { useState } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import Image from 'next/image';
import {
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Box,
} from '@mui/material';
import { useFormik } from 'formik';
import LoadingButton from '@mui/lab/LoadingButton';
import QuillEditor from '../../QuillEditor';
import { postPost } from '../../../services/Post';
import upload from '../../../services/Img';
import ImgDropzone from '../../ImgDropzone';
import { strip } from '../../../utils/htmlParser.ts';
import hotToast from '../../../utils/hotToast';

const PostCreate = ({ categoryTitle }) => {
  const [isLoading, setLoading] = useState(false);
  const [cover, setCover] = useState();
  const [image, setImage] = useState(undefined);
  const formik = useFormik({
    initialValues: {
      context: '',
      title: '',
    },
    onSubmit: async ({ title, context }) => {
      if (!title) {
        hotToast('error', 'Title is required ! ');
        return;
      }
      if (title.length > 255) {
        hotToast('error', 'Title is too long ! ');
        return;
      }
      if (strip(context) < 100) {
        hotToast('error', 'Content must not be too less !');
        return;
      }
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

  const handleCropImg = async (base64) => {
    setCover(base64);
    const file = await (await fetch(base64)).blob();
    setImage(file);
  };

  const cancel = () => Router.back();
  return (
    <>
      <Head>
        <title>Make Post | ThinkMore Forum</title>
      </Head>
      <Typography variant="h4">Make Post</Typography>
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
                  height: 380,
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
            <Box sx={{ mt: 3 }}>
              <ImgDropzone
                accept="image/jpg,image/png, image/jpeg"
                afterCrop={handleCropImg}
                aspectRatio={2.37}
              >
                <Box
                  sx={{
                    alignItems: 'center',
                    border: 1,
                    borderRadius: 1,
                    borderStyle: 'dashed',
                    borderColor: 'divider',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    outline: 'none',
                    p: 6,
                    '&:hover': {
                      backgroundColor: 'action.hover',
                      cursor: 'pointer',
                      opacity: 0.5,
                    },
                  }}
                >
                  <Image
                    alt="Select image"
                    src="/file_upload.svg"
                    width={100}
                    height={80}
                  />
                  <Box sx={{ p: 2 }}>
                    <Typography variant="h6">Select image</Typography>
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body1">
                        Drop image browse thorough your machine
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </ImgDropzone>
            </Box>
          </CardContent>
        </Card>
        <Card sx={{ overflow: 'visible' }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Basic details
            </Typography>
            <TextField
              fullWidth
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
              value={formik.values.context}
              placeholder="Write something"
              sx={{
                height: 330,
                mt: 3,
              }}
            />
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
    </>
  );
};

export default PostCreate;
