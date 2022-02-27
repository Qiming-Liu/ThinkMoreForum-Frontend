import React from 'react';
import Head from 'next/head';

import {
  Box,
  Chip,
  Container,
  Divider,
  Typography,
  Avatar,
} from '@mui/material';

const PostContent = (props) => {
  const { post } = props;
  const timeStamp = new Date(post.createTimestamp);
  const createDate = timeStamp.toLocaleDateString('en-AU');
  const createTime = timeStamp.toLocaleTimeString('en-AU');
  const DateTime = `${createDate.toString()} ${createTime.toString()}`;
  return (
    <>
      <Head>
        <title>ThinkMoreForum | {post.title}</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" sx={{ mt: 3, mb: 3 }}>
            {post.title}
          </Typography>
          <Chip label={post.category.title} />
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              mt: 3,
            }}
          >
            <Avatar src={post.postUsers.profileImg} />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2">
                By {post.postUsers.username} • {DateTime}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              backgroundImage: `url('/logo.png')`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              borderRadius: 1,
              height: 380,
              mt: 3,
            }}
          />
          <Box sx={{ py: 3 }}> {post.context}</Box>

          <Divider sx={{ my: 3 }} />
        </Container>
      </Box>
    </>
  );
};

export default PostContent;
