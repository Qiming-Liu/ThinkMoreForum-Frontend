import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, Container, Divider } from '@mui/material';
import NextLink from 'next/link';
import ArrowLeftIcon from '../../icons/arrow-left';
import { getPostByPostId } from '../../services/usersServices';
import PostContent from '../../components/Post/PostContent';

const Post = () => {
  const router = useRouter();
  const { categoryTitle, postId } = router.query;
  const [post, setPost] = useState(null);

  useEffect(() => {
    const getPost = async () => {
      const { data: responsePost } = await getPostByPostId(postId);
      setPost(responsePost);
    };
    getPost();
  }, [postId]);
  if (!post) return null;
  return (
    <Container maxWidth="md">
      <NextLink href={`/category/${categoryTitle}`} passHref>
        <Button component="a" startIcon={<ArrowLeftIcon fontSize="small" />}>
          Back to {categoryTitle}
        </Button>
      </NextLink>
      <Divider sx={{ my: 3 }} />
      <PostContent post={post} />
    </Container>
  );
};

export default Post;
