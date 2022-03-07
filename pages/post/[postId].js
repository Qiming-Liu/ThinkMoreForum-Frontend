import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Button, Divider } from '@mui/material';
import NextLink from 'next/link';
import ArrowLeftIcon from '../../icons/arrow-left';
import {
  checkIsFavoringPost,
  submitUnfavoritePost,
  submitFavoritePost,
} from '../../services/Post';
import { getPostById, getCommentsByPostId } from '../../services/Public';
import PostContent from '../../components/Post/PostContent';
import AntComment from '../../components/AntComment';

const Post = () => {
  const router = useRouter();
  const { postId } = router.query;
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [postFaved, setPostFaved] = useState(false);
  const { isLogin } = useSelector((state) => state.sign);

  const handleFavPost = async () => {
    if (postFaved) {
      await submitUnfavoritePost(postId);
    } else {
      await submitFavoritePost(postId);
    }
    setPostFaved(!postFaved);
  };

  useEffect(() => {
    if (typeof postId !== 'undefined') {
      const getPostContent = async () => {
        const { data: responsePost } = await getPostById(postId);
        setPost(responsePost);
        const { data: responseComments } = await getCommentsByPostId(postId);

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

  const rootComment = comments.filter(
    (comment) => comment.parentComment === null,
  );

  rootComment.forEach((comment) => {
    // eslint-disable-next-line no-param-reassign
    comment.childComments = [];
  });

  if (rootComment) {
    comments
      .filter((comment) => comment.parentComment !== null)
      .forEach((childComment) => {
        rootComment
          .find((pComment) => pComment.id === childComment.parentComment.id)
          .childComments.push(childComment);
      });
  }

  return (
    <>
      <NextLink href={`/category/${post.category.title}`} passHref>
        <Button component="a" startIcon={<ArrowLeftIcon fontSize="small" />}>
          Back to {post.category.title}
        </Button>
      </NextLink>
      <Divider sx={{ my: 3 }} />
      <PostContent
        post={post}
        isFavored={postFaved}
        toggleFav={handleFavPost}
      />
      {rootComment &&
        rootComment.map((comment) => (
          <AntComment comment={comment} key={comment.id}>
            {comment.childComments.map((childComment) => (
              <AntComment comment={childComment} key={childComment.id} />
            ))}
          </AntComment>
        ))}
    </>
  );
};

export default Post;
