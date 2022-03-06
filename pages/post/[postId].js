import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Button, Divider } from '@mui/material';
import NextLink from 'next/link';
import ArrowLeftIcon from '../../icons/arrow-left';
import { createNotification } from '../../services/Notification';
import {
  getPostByPostId,
  checkIsFavoringPost,
  submitUnfavoritePost,
  submitFavoritePost,
} from '../../services/Post';
import { getUserById } from '../../services/Users';
import { getCommentByPost } from '../../services/Comment';
import PostContent from '../../components/Post/PostContent';
import ProfileComment from '../../components/Profile/ProfileComment';

const Post = () => {
  const router = useRouter();
  const { categoryTitle, postId } = router.query;
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [postFaved, setPostFaved] = useState(false);
  const { isLogin } = useSelector((state) => state.sign);
  const [userId, setUserId] = useState();
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
      await submitUnfavoritePost(postId);
    } else {
      await submitFavoritePost(postId);
      const { data: user } = await getUserById(userId);
      const type = 'follow_post';
      await createNotification({ user, type });
    }
    setPostFaved(!postFaved);
  };

  useEffect(() => {
    if (typeof postId !== 'undefined') {
      const getPostContent = async () => {
        const { data: responsePost } = await getPostByPostId(postId);
        setPost(responsePost);
        setUserId(responsePost.postUsers.id);
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
    <>
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
    </>
  );
};

export default Post;
