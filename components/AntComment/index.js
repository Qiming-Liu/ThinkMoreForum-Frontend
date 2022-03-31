/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { Comment, Tooltip, Avatar } from 'antd';
import NextLink from 'next/link';
import myTime from '../../utils/myTime';
import CommentForm from '../Post/CommentForm';

const AntComment = ({
  comment,
  replies,
  sendChildComment,
  login,
  parentId,
}) => {
  const { commentUsers, createTimestamp } = comment;
  const [showReplying, setShowReplying] = useState(false);
  const mentionUser = commentUsers.username;
  const handleCommentClose = () => {
    setShowReplying(false);
  };
  return (
    <Comment
      key={comment.id}
      actions={[
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <span
          key="comment-nested-reply-to"
          onClick={() => setShowReplying(!showReplying)}
        >
          {login && (showReplying ? 'Cancel' : 'Reply')}
        </span>,
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
      content={comment.context}
      datetime={
        <Tooltip>
          <span>{myTime(createTimestamp)}</span>
        </Tooltip>
      }
    >
      {showReplying ? (
        <CommentForm
          handleSubmit={(context) => sendChildComment(context, parentId)}
          login={login}
          mentionUser={mentionUser}
          closeComment={handleCommentClose}
        />
      ) : null}
      {replies &&
        replies.map((reply) => (
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
