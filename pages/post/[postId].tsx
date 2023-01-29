import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Button, Divider } from '@mui/material';
import NextLink from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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
import { postComment } from '../../services/Comment';
import PostContent from '../../components/Post/PostContent';
import AntComment from '../../components/AntComment';
import CommentForm from '../../components/Post/CommentForm';
import CommonContainer from 'components/Layout/CommonContainer';
import { PinPostContextProvider } from '../../components/Post/PinPostContext';
import hotToast from '../../utils/hotToast';
import { useWSContext } from '../../contexts/WebsocketContext';
import * as staticData from '../../utils/staticData';

export const getStaticPaths = async () => {
  // preview mode
  if (process.env.NEXT_PUBLIC_PREVIEW_ENABLED) {
    const paths = staticData.postList.data.map((post: any) => ({
      params: { postId: post.id },
    }));
    return { paths, fallback: 'blocking' };
  }

  const { data: posts } = await getAllPosts();
  const paths = posts.map((post: any) => ({
    params: { postId: post.id },
  }));
  return { paths, fallback: 'blocking' };
};

export const getStaticProps = async ({ params }: { params: any }) => {
  try {
    // preview mode
    if (process.env.NEXT_PUBLIC_PREVIEW_ENABLED) {
      const post = [
        staticData.post1.data,
        staticData.post2.data,
        staticData.post3.data,
      ].find((post) => post.id === params.postId);
      if (post) {
        return { props: { post } };
      } else {
        return {
          notFound: true,
          revalidate: 10,
        };
      }
    }

    const { data: post } = await getPostById(params.postId);
    return { props: { post } };
  } catch {
    return {
      notFound: true,
      revalidate: 10,
    };
  }
};

const Post = ({ post }: { post: any }) => {
  const router = useRouter();
  const { postId } = router.query;

  // preview mode
  useEffect(() => {
    if (
      process.env.NEXT_PUBLIC_PREVIEW_ENABLED &&
      postId !== '3017f26a-4117-41ac-af3a-a5c9b0bd7d8e'
    ) {
      router.push('/post/3017f26a-4117-41ac-af3a-a5c9b0bd7d8e');
    }
  }, [postId, router]);

  const [comments, setComments] = useState([]);
  const [postFaved, setPostFaved] = useState(false);
  const { isLogin } = useSelector((state: any) => state.sign);
  const { handleRemind } = useWSContext() as any;

  const rootComments = comments.filter(
    (comment: any) => comment.parentComment === null,
  );
  const childComments = comments.filter(
    (comment: any) => comment.parentComment !== null,
  );
  const handleFavPost = async () => {
    if (postFaved) {
      await submitUnfavoritePost(postId as string);
    } else {
      await submitFavoritePost(postId as string);
    }
    setPostFaved(!postFaved);
  };

  const sendComment = async (context: string) => {
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
      await postComment(requestBody);
      handleRemind(post.postUsers.username);
      const getComments = async () => {
        const { data: responseComments } = await getCommentsByPostId(
          postId as string,
        );
        setComments(responseComments);
      };
      getComments();
    } catch (err: any) {
      hotToast('error', err.response.data.error);
    }
  };
  const sendChildComment = async (context: string, parentId: string) => {
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
      await postComment(requestBody);
      handleRemind(post.postUsers.username);
      const getComments = async () => {
        const { data: responseComments } = await getCommentsByPostId(
          postId as string,
        );
        setComments(responseComments);
      };
      getComments();
    } catch (err: any) {
      hotToast('error', err.response.data.error);
    }
  };
  const getReplies = (commentId: string) =>
    childComments
      .filter((comment: any) => comment.parentComment.id === commentId)
      .sort(
        (a: any, b: any) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
  useEffect(() => {
    if (typeof postId !== 'undefined') {
      const getComments = async () => {
        const { data: responseComments } = await getCommentsByPostId(
          postId as string,
        );
        setComments(responseComments);
      };
      getComments();
      const getPostContent = async () => {
        if (isLogin) {
          const { data: responseIsFavoringPost } = await checkIsFavoringPost(
            postId as string,
          );
          setPostFaved(responseIsFavoringPost);
        }
      };
      getPostContent();
    }
  }, [postId, postFaved, isLogin]);

  if (!post) return null;
  return (
    <CommonContainer>
      <PinPostContextProvider thisPost={post}>
        <NextLink href={`/category/${post.category.title}`} passHref>
          <Button component="a" startIcon={<ArrowBackIcon fontSize="small" />}>
            Back to {post.category.title}
          </Button>
        </NextLink>
        <Divider sx={{ my: 1.5 }} />
        <PostContent
          post={post}
          isFavored={postFaved}
          toggleFav={handleFavPost}
        />
        {rootComments &&
          rootComments.map((rootComment: any) => {
            return (
              <AntComment
                key={rootComment.id}
                comment={rootComment}
                replies={getReplies(rootComment.id)}
                sendChildComment={sendChildComment}
                login={isLogin}
                parentId={rootComment.id}
              />
            );
          })}
        {rootComments.length === 0 ? null : <Divider sx={{ my: 3 }} />}
        <CommentForm handleSubmit={sendComment} login={isLogin} />
      </PinPostContextProvider>
    </CommonContainer>
  );
};

export default Post;
