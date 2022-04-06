import React, { useState, useEffect } from 'react';
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
import { editPost } from '../../../services/Post';
import { getPostById } from '../../../services/Public';
import upload from '../../../services/Img';
import hotToast from '../../../utils/hotToast';
import ImgDropzone from '../../ImgDropzone';
import { strip } from '../../../utils/htmlParser.ts';

const PostEdit = ({ postId }) => {
  const [isLoading, setLoading] = useState(false);
  const [cover, setCover] = useState();
  const [image, setImage] = useState(undefined);
  const [postTitle, setPostTitle] = useState('');
  const [postContext, setPostContext] = useState('');

  useEffect(() => {
    (async () => {
      const { data } = await getPostById(postId);
      setPostTitle(data.title);
      setPostContext(data.context);
      setCover(data.headImgUrl);
    })();
  }, [postId]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      context: postContext,
      title: postTitle,
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
      if (image) {
        const { data: headImg } = await upload(image);
        setCover(headImg.url);
      }
      setLoading(true);
      await editPost(
        {
          context,
          headImgUrl: cover,
          title,
        },
        postId,
      );
      setLoading(false);
      Router.push(`/post/${postId}`);
      hotToast('success', 'Post edited successfully');
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
        <title>Edit Post | ThinkMore Forum</title>
      </Head>
      <Typography variant="h4">Edit Post</Typography>
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
                    <Typography variant="h6">Change image</Typography>
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body1">
                        Drop image browse through your machine
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
              InputLabelProps={{ shrink: !!postTitle }}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              defaultValue={formik.initialValues.title}
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
              defaultValue={formik.initialValues.context}
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
            Save Changes
          </LoadingButton>
        </Box>
      </form>
    </>
  );
};

export default PostEdit;
