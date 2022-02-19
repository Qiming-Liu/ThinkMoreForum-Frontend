import { useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { Box, Button, Container, Divider, Typography } from '@mui/material';
import { PostCard } from '../../components/Post/PostCard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { ArrowLeft as ArrowLeftIcon } from '../../icons/arrow-left';

const PostList = () => {
  const [posts, setPosts] = useState([
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
  ]);

  return (
    <>
      <Head>
        <title>Post List | Material Kit Pro</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="md">
          <NextLink href="/" passHref>
            <Button
              component="a"
              startIcon={<ArrowLeftIcon fontSize="small" />}
            >
              Back to categories
            </Button>
          </NextLink>
          <Typography variant="h3" sx={{ mt: 3 }}>
            Blog Platform
          </Typography>
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
            <Button
              endIcon={<ArrowForwardIcon fontSize="small" />}
              sx={{ ml: 1 }}
            >
              Older posts
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default PostList;
