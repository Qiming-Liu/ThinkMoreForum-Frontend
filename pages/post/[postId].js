import React from 'react';
import { useRouter } from 'next/router';
import { Button, Container, Divider, Typography } from '@mui/material';
import NextLink from 'next/link';
import ArrowLeftIcon from '../../../../icons/arrow-left';

const Post = () => {
  const router = useRouter();
  const { categoryTitle, postId } = router.query;
  return (
    <Container maxWidth="md">
      <NextLink href={`/category/${categoryTitle}`} passHref>
        <Button component="a" startIcon={<ArrowLeftIcon fontSize="small" />}>
          Back to {categoryTitle}
        </Button>
      </NextLink>
      <Typography variant="h3" sx={{ mt: 3 }}>
        {postId}
      </Typography>
      <Divider sx={{ my: 3 }} />
    </Container>
  );
};

export default Post;
