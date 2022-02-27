import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, Container, Divider } from '@mui/material';
import NextLink from 'next/link';
import ArrowLeftIcon from '../../icons/arrow-left';
import {
  getPostByPostId,
  getCommentByPost,
} from '../../services/usersServices';
import PostContent from '../../components/Post/PostContent';
import ProfileComment from '../../components/Profile/ProfileComment';

const Post = () => {
  const router = useRouter();
  const { categoryTitle, postId } = router.query;
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const rootComments = comments.filter(
    (comment) => comment.parentComment === null,
  );
  useEffect(() => {
    const getPostContent = async () => {
      const { data: responsePost } = await getPostByPostId(postId);
      setPost(responsePost);
      const { data: responseComments } = await getCommentByPost(postId);
      setComments(responseComments);
    };
    getPostContent();
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
      {rootComments &&
        rootComments.map((rootComment) => {
          return <ProfileComment key={rootComment.id} comment={rootComment} />;
        })}
    </Container>
  );
};

export default Post;
