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
import { createComment } from '../../services/Comment';
import PostContent from '../../components/Post/PostContent';
import AntComment from '../../components/AntComment';
import CommentForm from '../../components/Post/CommentForm';
import hotToast from '../../utils/hotToast';

const Post = () => {
  const router = useRouter();
  const { postId } = router.query;
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [postFaved, setPostFaved] = useState(false);
  const { isLogin, myDetail } = useSelector((state) => state.sign);
  const rootComments = comments.filter(
    (comment) => comment.parentComment === null,
  );
  const childComments = comments.filter(
    (comment) => comment.parentComment !== null,
  );

  const handleFavPost = async () => {
    if (postFaved) {
      await submitUnfavoritePost(postId);
    } else {
      await submitFavoritePost(postId);
    }
    setPostFaved(!postFaved);
  };
  const sendComment = async (context) => {
    try {
      const requestBody = {
        context,
        post: {
          id: postId,
          title: post.title,
        },
        parentComment: null,
        commentUsers: {
          id: myDetail.id,
          headImgUrl: myDetail.headImgUrl,
          username: myDetail.username,
        },
        visibility: true,
      };
      await createComment(requestBody);
    } catch (err) {
      hotToast('error', err.response.data.error);
    }
  };
  const sendChildComment = async (context, parentId) => {
    try {
      const requestBody = {
        context,
        post: {
          id: postId,
          title: post.title,
        },
        commentUsers: {
          id: myDetail.id,
          headImgUrl: myDetail.headImgUrl,
          username: myDetail.username,
        },
        parentComment: {
          id: parentId,
        },
        visibility: true,
      };
      await createComment(requestBody);
      setComments([requestBody, ...comments]);
    } catch (err) {
      hotToast('error', err.response.data.error);
    }
  };
  const getReplies = (commentId) =>
    childComments
      .filter((comment) => comment.parentComment.id === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
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
      {rootComments &&
        rootComments.map((rootComment) => {
          return (
            <AntComment
              key={rootComment.id}
              comment={rootComment}
              replies={getReplies(rootComment.id)}
              sendComment={sendComment}
              sendChildComment={sendChildComment}
              login={isLogin}
            />
          );
        })}
      <CommentForm handleSubmit={sendComment} login={isLogin} />
    </>
  );
};

export default Post;
