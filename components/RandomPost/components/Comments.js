import { Typography, Grid } from '@mui/material';
import { Comment, Avatar } from 'antd';
import NextLink from 'next/link';
import React from 'react';

const Comments = ({ comment }) => {
  const { commentUsers, context, createTimestamp } = comment;
  return (
    <Grid container spacing={3}>
      <Grid item xs={8}>
        <Comment
          key={comment.id}
          author={
            <NextLink
              href={{
                pathname: `/profile/${commentUsers.username}`,
              }}
              passHref
            >
              {commentUsers.username}
            </NextLink>
          }
          avatar={
            <NextLink
              href={{
                pathname: `/profile/${commentUsers.username}`,
              }}
              passHref
            >
              <Avatar src={commentUsers.headImgUrl} />
            </NextLink>
          }
          content={context}
        />
      </Grid>
      <Grid item xs={4}>
        <Typography color="#9e9e9e" sx={{ ml: 3, mt: 2 }} variant="subtitle2">
          <b>{createTimestamp.substring(11, 16)}</b>
        </Typography>
      </Grid>
    </Grid>
    // <Grid container spacing={3}>
    //   <Grid item xs={1.5}>
    //     <Avatar src={commentUsers.headImgUrl} sx={{ width: 25, height: 25 }} />
    //   </Grid>
    //   <Grid item xs={6.5}>
    //     <Typography variant="subtitle2">{commentUsers.username}</Typography>
    //     <Typography
    //       color="#bdbdbd"
    //       sx={{ fontWeight: 'light' }}
    //       variant="subtitle2"
    //     >
    //       {context}
    //     </Typography>
    //   </Grid>
    //   <Grid item xs={4}>
    //     <Typography color="#9e9e9e" sx={{ ml: 3 }} variant="subtitle2">
    //       <b>{createTimestamp.substring(11, 16)}</b>
    //     </Typography>
    //   </Grid>
    // </Grid>
  );
};

export default Comments;
