import React from 'react';
import Head from 'next/head';
import NextLink from 'next/link';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
  Box,
  Button,
  Card,
  Chip,
  Container,
  Divider,
  Typography,
  Avatar,
} from '@mui/material';
import ArrowLeftIcon from '../../icons/arrow-left';

const postContent = {
  id: '24b76cac9a128cd949747080',
  author: {
    avatar: '/logo.png',
    name: 'Jie Yan Song',
  },
  category: 'Programming',
  content: `
## Cras at molestie lacus. Phasellus feugiat leo quis sem iaculis, sed mattis nibh accumsan.

Phasellus ullamcorper ultrices ullamcorper. Nunc auctor porttitor ex, non consequat ipsum aliquam at. Duis dapibus dolor in nisi viverra, a elementum nulla viverra. Etiam feugiat turpis leo, nec finibus diam rhoncus ac. Sed at metus et orci consequat facilisis vel vel diam.

## Cras at molestie lacus. Phasellus feugiat leo quis sem iaculis, sed mattis nibh accumsan.


Etiam faucibus massa auctor gravida finibus.
Cras nulla magna, dapibus sit amet accumsan nec, ullamcorper sit amet dolor.

Donec leo nisi, porta et gravida nec, tincidunt ac velit. Aliquam in turpis a quam tempus dapibus. Morbi in tellus tempor, hendrerit mi vel, aliquet tellus. Quisque vel interdum ante. Nunc quis purus sem. Donec at risus lacinia ipsum cursus condimentum at ac dui. Nulla bibendum feugiat tellus ac tristique. Proin auctor, lectus et accumsan varius, justo odio vulputate neque, et efficitur augue leo id ex. Aliquam eget turpis nisl. Nam sapien massa, sollicitudin et vehicula a, fringilla vitae purus. Praesent a vestibulum felis.

Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi maximus metus eget nulla malesuada, sit amet luctus est fringilla. Aenean imperdiet rhoncus justo, ut pharetra lorem gravida placerat. Duis et enim lorem. Aliquam placerat elit est, vitae fermentum ipsum finibus sed. Donec dapibus magna non tortor commodo rhoncus. Suspendisse luctus tincidunt eros, aliquet pellentesque neque venenatis quis. Aliquam auctor felis nec orci ornare gravida. Fusce ac neque sit amet nibh scelerisque molestie. Nullam in lorem viverra, aliquam nunc vel, interdum orci. Fusce mattis est neque, et tincidunt justo blandit quis. Etiam tincidunt purus in libero semper, vitae placerat dui vehicula. Pellentesque sit amet imperdiet purus, quis lacinia eros.

Duis placerat turpis non metus dapibus sagittis. Vestibulum ex massa, tempus pulvinar varius at, placerat non justo. Ut tristique nisl sed porta pulvinar. Nunc ex nibh, tempor eget elit vel, fringilla ornare risus. Praesent vel lacus finibus, laoreet nulla quis, semper tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec volutpat quis dui ac varius. Suspendisse potenti. Maecenas sagittis lacus vitae ex rhoncus, eu fringilla urna luctus.

## Donec vel erat augue. Aenean ut nisl cursus nulla tempus ultricies vel eget lorem.

Suspendisse pharetra dolor in massa molestie, vel molestie nunc accumsan. Cras varius aliquet pellentesque. Curabitur ac mi fermentum nibh congue pharetra in eu nunc. Vivamus mattis urna a fringilla facilisis. Cras finibus nulla in nulla imperdiet pharetra. Morbi vel tortor turpis.
`,
  cover: '/static/mock-images/blog/post_1.png',
  readTime: '5 min',
  title: 'Why I Still Lisp, and You Should Too',
};

const ForumPost = () => {
  return (
    <>
      <Head>
        <title>Blog: Post List | Material Kit Pro</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="md">
          <NextLink href="/category" passHref>
            <Button
              component="a"
              startIcon={<ArrowLeftIcon fontSize="small" />}
            >
              Category
            </Button>
          </NextLink>
          <Typography variant="h3" sx={{ mt: 3 }}>
            {postContent.title}
          </Typography>
          <Card
            elevation={16}
            sx={{
              alignItems: 'center',
              borderRadius: 1,
              display: 'flex',
              justifyContent: 'space-between',
              mb: 8,
              mt: 6,
              px: 3,
              py: 2,
            }}
          >
            <Typography variant="subtitle1">Hello, Admin</Typography>
            <NextLink href="/blog/new" passHref>
              <Button component="a" variant="contained">
                New Post
              </Button>
            </NextLink>
          </Card>
          <Chip label={postContent.category} />
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              mt: 3,
            }}
          >
            <Avatar src={postContent.author.avatar} />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2">
                By {postContent.author.name}
              </Typography>
              <Typography color="textSecondary" variant="body2">
                {`${postContent.readTime} read`}
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
          <Box sx={{ py: 3 }}>{postContent.content}</Box>
          <Divider sx={{ my: 3 }} />
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
              Pervious Post
            </Button>
            <Button
              endIcon={<ArrowForwardIcon fontSize="small" />}
              sx={{ ml: 1 }}
            >
              Next Post
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ForumPost;
