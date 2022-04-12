import React from 'react';
import NextLink from 'next/link';
import { Typography } from '@mui/material';
import { Comment, Avatar } from 'antd';

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
  );
};

export default Comments;
