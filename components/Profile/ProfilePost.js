import { React } from 'react';
import { Typography, Divider } from '@mui/material';
import PostCard from '../Post/PostCard';

const ProfilePost = () => {
  const posts = [
    {
      authorAvatar: '/logo.png',
      authorName: 'Adam',
      headImg: '/logo.png',
      createTimeStamp: '2022-02-02',
      abstract: 'testtest',
      title: 'test',
    },
    {
      authorAvatar: '/logo.png',
      authorName: 'Adam',
      headImg: '/logo.png',
      createTimeStamp: '2022-02-02',
      abstract: 'testtest2',
      title: 'test2',
    },
  ];

  return (
    <>
      <Typography variant="h4">Followed Posts</Typography>
      <Typography color="textSecondary" variant="subtitle1">
        These are the posts you have followed.
      </Typography>
      <Divider sx={{ my: 3 }} />
      {posts.map((post) => (
        <PostCard
          authorAvatar={post.authorAvatar}
          authorName={post.authorName}
          headImg={post.headImg}
          createTimeStamp={post.createTimeStamp}
          abstract={post.abstract}
          title={post.title}
        />
      ))}
    </>
  );
};

export default ProfilePost;
