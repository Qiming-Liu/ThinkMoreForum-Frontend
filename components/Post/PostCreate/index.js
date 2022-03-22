import React, { useState } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import Image from 'next/image';
import {
  Typography,
  Card,
  Container,
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
import hotToast from '../../../utils/hotToast';
import ImageDropZone from '../../ImageDropZone';
import fileToBase64 from '../../../utils/fileToBase64';
import ImageCropper from '../../ImageCropper';
import SignDialog from '../../Sign/SignDialog';

const PostCreate = ({ categoryTitle }) => {
  const [isLoading, setLoading] = useState(false);
  const [cover, setCover] = useState();
  const [image, setImage] = useState(undefined);
  const [isOpen, setIsOpen] = useState(false);
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
      if (
        !context.replace(/<.*?>| [</].*?>/gi, '') &&
        !context.includes('<iframe') &&
        !context.includes('<img')
      ) {
        hotToast('error', 'Context is required !');
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

  const handleCoverDrop = async ([file]) => {
    const data = await fileToBase64(file);
    setCover(data);
    setImage(file);
  };
  const handleCrop = () => {
    setIsOpen(true);
  };

  const cancel = () => Router.back();
  return (
    <>
      <Head>
        <title>Create A New Post | ThinkMoreForum</title>
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
                    borderRadius: 1,
                    height: 330,
                    mt: 3,
                  }}
                >
                  <Image src={cover} width="650px" height="330px" />
                </Box>
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
              <Button onClick={handleCrop} sx={{ mt: 3 }} disabled={!cover}>
                Crop photo
              </Button>
              <Box sx={{ mt: 3 }}>
                <ImageDropZone
                  accept="image/jpg,image/png, image/jpeg"
                  maxFiles={1}
                  onDrop={handleCoverDrop}
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
                placeholder="Write something"
                value={formik.values.context}
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
        <SignDialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <ImageCropper
            src={cover}
            alt="image"
            setCover={setCover}
            setIsOpen={setIsOpen}
            setImage={setImage}
            file={image}
          />
        </SignDialog>
      </Container>
    </>
  );
};

export default PostCreate;
