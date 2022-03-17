/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { Comment, Tooltip, Avatar } from 'antd';
import NextLink from 'next/link';
import myTime from '../../utils/myTime';
import CommentForm from '../Post/CommentForm';

const AntComment = ({ comment, replies, sendChildComment, login }) => {
  const { commentUsers, createTimestamp } = comment;
  const [showReplying, setShowReplying] = useState(false);
  const parrentId = comment.parentComment;
  return (
    <Comment
      key={comment.id}
      actions={[
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        parrentId === null ? (
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions
          <span
            key="comment-nested-reply-to"
            onClick={() => setShowReplying(!showReplying)}
          >
            Reply
          </span>
        ) : (
          <span> </span>
        ),
      ]}
      author={commentUsers.username}
      avatar={
        <NextLink href={`/profile/${commentUsers.username}`} passHref>
          <Avatar src={commentUsers.headImgUrl} />
        </NextLink>
      }
      content={comment.context}
      datetime={
        <Tooltip>
          <span>{myTime(createTimestamp)}</span>
        </Tooltip>
      }
    >
      {showReplying ? (
        <CommentForm
          handleSubmit={(context) => sendChildComment(context, comment.id)}
          login={login}
        />
      ) : null}
      {replies !== null &&
        replies.map((reply) => (
          <AntComment comment={reply} key={reply.id} replies={[]} />
        ))}
    </Comment>
  );
};

export default AntComment;
