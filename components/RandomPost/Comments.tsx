import React from 'react';
import NextLink from 'next/link';
import { Typography } from '@mui/material';
import { Comment } from 'antd';
import { Avatar } from '@mui/material';

type User = {
  id: string;
  username: string;
  headImgUrl: string;
};

const Comments = ({ comment }: { comment: any }) => {
  const { commentUsers, context }: { commentUsers: User; context: string } =
    comment;
  return (
    <Comment
      key={comment.id}
      author={
        <Typography variant="subtitle2">{commentUsers.username}</Typography>
      }
      avatar={
        <NextLink
          href={{
            pathname: `/profile/${commentUsers.username}`,
          }}
          passHref
        >
          <Avatar
            sx={{ width: 32, height: 32 }}
            src={commentUsers.headImgUrl}
          />
        </NextLink>
      }
      content={context}
    />
  );
};

export default Comments;
