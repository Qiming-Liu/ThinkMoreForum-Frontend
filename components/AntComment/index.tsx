import React, { useState } from 'react';
import { Avatar, Comment } from 'antd';
import { Typography } from '@mui/material';
import NextLink from 'next/link';
import myTime from '../../utils/myTime';
import CommentForm from '../Post/CommentForm';

type CommentType = {
  id: string;
  context: string;
  createTimestamp: string;
  commentUsers: {
    id: string;
    username: string;
    headImgUrl: string;
  };
  mentionUser: string | null;
  parentComment: { id: string } | null;
  post: { id: string; title: string };
  visibility: boolean;
};

const AntComment: React.FC<{
  comment: CommentType;
  replies: any;
  sendChildComment: any;
  login: boolean;
  parentId: string;
}> = ({ comment, replies, sendChildComment, login, parentId }) => {
  const { commentUsers, createTimestamp } = comment;
  const [showReplying, setShowReplying] = useState(false);
  const mentionUsername: string = commentUsers.username;
  const parentCommentIsRoot: boolean = comment.parentComment === null;
  const handleCommentClose: () => void = () => {
    setShowReplying(false);
  };
  return (
    <Comment
      key={comment.id}
      actions={[
        <Typography
          key={comment.id}
          variant="button"
          sx={{ cursor: 'pointer' }}
          onClick={() => setShowReplying(!showReplying)}
        >
          {login && (showReplying ? 'Cancel' : 'Reply')}
        </Typography>,
      ]}
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
      content={
        <Typography color="#252526" variant="subtitle2">
          {comment.context}
        </Typography>
      }
      datetime={myTime(createTimestamp)}
    >
      {showReplying ? (
        <CommentForm
          handleSubmit={(context: string) =>
            sendChildComment(context, parentId)
          }
          login={login}
          mentionUsername={mentionUsername}
          parentCommentIsRoot={parentCommentIsRoot}
          closeComment={handleCommentClose}
        />
      ) : null}
      {replies &&
        replies.map((reply: any) => (
          <AntComment
            comment={reply}
            key={reply.id}
            replies={[]}
            sendChildComment={sendChildComment}
            login={login}
            parentId={parentId}
          />
        ))}
    </Comment>
  );
};

export default AntComment;
