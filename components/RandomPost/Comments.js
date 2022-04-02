import { Typography, Grid } from '@mui/material';
import { Comment, Avatar } from 'antd';
import NextLink from 'next/link';
import React from 'react';

const Comments = ({ comment }) => {
  const { commentUsers, context, createTimestamp } = comment;

  return (
    <Grid container spacing={3} justifyContent="space-between">
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
              <Typography variant="subtitle2">
                {commentUsers.username}
              </Typography>
            </NextLink>
          }
          avatar={
            <NextLink
              href={{
                pathname: `/profile/${commentUsers.username}`,
              }}
              passHref
            >
              <Avatar
                src={commentUsers.headImgUrl}
                style={{
                  marginTop: '5px',
                  boxShadow:
                    '2px 4px 4px 1px rgba(100, 100, 100, 0.1), 0px 2px 4px 1px rgba(100, 100, 100, 0.1)',
                }}
              />
            </NextLink>
          }
          content={context}
        />
      </Grid>
      <Grid item sx={{ mr: 2 }}>
        <Typography color="#9e9e9e" sx={{ ml: 3, mt: 2 }} variant="subtitle2">
          <b>{createTimestamp.substring(11, 16)}</b>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Comments;
