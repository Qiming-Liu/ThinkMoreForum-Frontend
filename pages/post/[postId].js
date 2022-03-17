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
import {
  getPostById,
  getCommentsByPostId,
  getAllPosts,
} from '../../services/Public';
import {
  changeCategoryPinPost,
  deleteCategoryPinPost,
} from '../../services/Category';
import { createComment } from '../../services/Comment';
import PostContent from '../../components/Post/PostContent';
import AntComment from '../../components/AntComment';
import CommentForm from '../../components/Post/CommentForm';
import hotToast from '../../utils/hotToast';

export const getStaticPaths = async () => {
  const { data: posts } = await getAllPosts();
  const paths = posts.map((post) => ({
    params: { postId: post.id },
  }));
  return { paths, fallback: 'blocking' };
};

export const getStaticProps = async ({ params }) => {
  try {
    const { data: post } = await getPostById(params.postId);
    return { props: { post } };
  } catch {
    return {
      notFound: true,
      revalidate: 10,
    };
  }
};

const Post = ({ post }) => {
  const router = useRouter();
  const { postId } = router.query;
  const [comments, setComments] = useState([]);
  const [postFaved, setPostFaved] = useState(false);
  const { isLogin } = useSelector((state) => state.sign);
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
        parentComment: {
          id: parentId,
        },
        visibility: true,
      };
      await createComment(requestBody);
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
  const handlePinPost = async (categoryId) => {
    try {
      await changeCategoryPinPost(categoryId, postId);
    } catch (err) {
      hotToast('error', err.message);
    }
  };
  const handleUnpinPost = async (categoryId) => {
    try {
      deleteCategoryPinPost(categoryId);
    } catch (err) {
      hotToast('error', err.message);
    }
  };
  useEffect(() => {
    if (typeof postId !== 'undefined') {
      const getPostContent = async () => {
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
        handlePinPost={handlePinPost}
        handleUnpinPost={handleUnpinPost}
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
