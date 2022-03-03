import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Button, Container, Divider } from '@mui/material';
import NextLink from 'next/link';
import ArrowLeftIcon from '../../icons/arrow-left';
import {
  getPostByPostId,
  getCommentByPost,
  checkIsFavoringPost,
  submitUnfavoritePost,
  submitFavoritePost,
} from '../../services/usersServices';
import PostContent from '../../components/Post/PostContent';
import ProfileComment from '../../components/Profile/ProfileComment';

const Post = () => {
  const router = useRouter();
  const { categoryTitle, postId } = router.query;
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [postFaved, setPostFaved] = useState(false);
  const { isLogin } = useSelector((state) => state.sign);
  const rootComments = comments.filter(
    (comment) => comment.parentComment === null,
  );
  const childComments = comments.filter(
    (comment) => comment.parentComment !== null,
  );
  const getReplies = (commentId) =>
    childComments
      .filter((comment) => comment.parentComment.id === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );

  const handleFavPost = async () => {
    if (postFaved) {
      const { data: response } = await submitUnfavoritePost(postId);
      console.log(response);
    } else {
      const { data: response } = await submitFavoritePost(postId);
      console.log(response);
    }
    setPostFaved(!postFaved);
  };

  useEffect(() => {
    if (typeof postId !== 'undefined') {
      const getPostContent = async () => {
        const { data: responsePost } = await getPostByPostId(postId);
        setPost(responsePost);
        const { data: responseComments } = await getCommentByPost(postId);
        setComments(responseComments);
        if (isLogin) {
          const { data: responseIsFavoringPost } = await checkIsFavoringPost(
            postId,
          );
          setPostFaved(responseIsFavoringPost);
        }
      };
      getPostContent();
    }
  }, [postId, postFaved, isLogin]);
  if (!post) return null;
  return (
    <Container maxWidth="md">
      <NextLink href={`/category/${categoryTitle}`} passHref>
        <Button component="a" startIcon={<ArrowLeftIcon fontSize="small" />}>
          Back to {categoryTitle}
        </Button>
      </NextLink>
      <Divider sx={{ my: 3 }} />
      <PostContent
        post={post}
        isFavored={postFaved}
        toggleFav={handleFavPost}
      />
      {rootComments &&
        rootComments.map((rootComment) => {
          return (
            <ProfileComment
              key={rootComment.id}
              comment={rootComment}
              replies={getReplies(rootComment.id)}
            />
          );
        })}
    </Container>
  );
};

export default Post;
