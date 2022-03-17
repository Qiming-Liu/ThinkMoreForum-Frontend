import React, { useState, useEffect } from 'react';
import { Typography, Divider } from '@mui/material';
import PostCard from '../Post/PostCard';
import MyPostCard from '../Post/MyPostCard';
import {
  getPostByUsername,
  getFollowPostByUsername,
} from '../../services/Public';

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
        setPost(responsepost);
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
          <MyPostCard
            id={post.id}
            authorAvatar={post.postUsers.headImgUrl}
            authorName={post.postUsers.username}
            headImg={post.headImg}
            createTimeStamp={post.createTimestamp}
            abstract={post.abstract}
            title={post.title}
            visibility={post.visibility}
          />
        ))}
      {title === 'Favorite' &&
        posts.map((post) => (
          <PostCard
            authorAvatar={post.users.headImgUrl}
            authorName={post.users.username}
            headImg={post.headImg}
            createTimeStamp={post.createTimestamp}
            abstract={post.abstract}
            title={post.title}
          />
        ))}
    </>
  );
};

export default ProfilePost;
