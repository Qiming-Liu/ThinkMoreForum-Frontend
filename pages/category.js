import React from 'react';
import NextLink from 'next/link';
import { Box, Button, Container, Divider } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PostCard from '../components/Post/PostCard';
import ArrowLeftIcon from '../icons/arrow-left';

const PostList = () => {
  const posts = [
    {
      authorAvatar: '/logo.png',
      authorName: 'Adam',
      headImg: '/logo.png',
      createTimeStamp: '2022-02-02',
      abstract: 'testtest',
      title: 'test',
    },
    {
      authorAvatar: '/logo.png',
      authorName: 'Adam',
      headImg: '/logo.png',
      createTimeStamp: '2022-02-02',
      abstract: 'testtest2',
      title: 'test2',
    },
  ];

  return (
    <Container maxWidth="md">
      <NextLink href="/" passHref>
        <Button component="a" startIcon={<ArrowLeftIcon fontSize="small" />}>
          Back to Home
        </Button>
      </NextLink>
      <Divider sx={{ my: 3 }} />
      {posts.map((post) => (
        <PostCard
          authorAvatar={post.authorAvatar}
          authorName={post.authorName}
          headImg={post.headImg}
          createTimeStamp={post.createTimeStamp}
          abstract={post.abstract}
          title={post.title}
        />
      ))}
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          mt: 4,
          mb: 8,
        }}
      >
        <Button disabled startIcon={<ArrowBackIcon fontSize="small" />}>
          Newer
        </Button>
        <Button endIcon={<ArrowForwardIcon fontSize="small" />} sx={{ ml: 1 }}>
          Older posts
        </Button>
      </Box>
    </Container>
  );
};

export default PostList;
