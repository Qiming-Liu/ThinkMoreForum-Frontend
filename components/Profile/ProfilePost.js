import React, { useState, useEffect } from 'react';
import { Typography, Divider } from '@mui/material';
import PostCard from '../Post/PostCard';
import {
  getPostByUsername,
  getFollowPostByUsername,
  getPostById,
} from '../../services/Public';
import MyTime from '../../utils/myTime';

const ProfilePost = (props) => {
  const { title, value } = props;
  const [posts, setPost] = useState(null);
  useEffect(() => {
    if (value) {
      const getPosts = async () => {
        const { data: responsepost } = await getPostByUsername(value);
        setPost(responsepost);
      };
      const getFollowPosts = async () => {
        const { data: responsepost } = await getFollowPostByUsername(value);
        const completePostsPromises = responsepost.map(async (post) => {
          const { data: completePost } = await getPostById(post.post.id);
          return completePost;
        });
        const completePosts = await Promise.all(completePostsPromises);
        setPost(completePosts);
      };
      if (title === 'Posts') {
        getPosts();
      } else {
        getFollowPosts();
      }
    }
  }, [title, value]);
  if (!posts) return null;
  return (
    <>
      <Typography variant="h4">{title}</Typography>
      {title === 'Posts' && (
        <Typography color="textSecondary" variant="subtitle1">
          These are your posts.
        </Typography>
      )}
      {title === 'Favorite' && (
        <Typography color="textSecondary" variant="subtitle1">
          These are the posts you have followed.
        </Typography>
      )}
      <Divider sx={{ my: 3 }} />
      {title === 'Posts' &&
        posts.map((post) => (
          <PostCard
            id={post.id}
            authorAvatar={post.postUsers.headImgUrl}
            authorName={post.postUsers.username}
            authorId={post.postUsers.id}
            headImg={post.headImgUrl}
            createTimeStamp={MyTime(post.createTimestamp)}
            abstract={post.abstract}
            title={post.title}
            commentCount={post.commentCount}
            viewCount={post.viewCount}
            followCount={post.followCount}
          />
        ))}
      {title === 'Favorite' &&
        posts.map((post) => (
          <PostCard
            id={post.id}
            authorAvatar={post.postUsers.headImgUrl}
            authorName={post.postUsers.username}
            authorId={post.postUsers.id}
            headImg={post.headImgUrl}
            createTimeStamp={MyTime(post.createTimestamp)}
            abstract={post.abstract}
            title={post.title}
            commentCount={post.commentCount}
            viewCount={post.viewCount}
            followCount={post.followCount}
          />
        ))}
    </>
  );
};

export default ProfilePost;
