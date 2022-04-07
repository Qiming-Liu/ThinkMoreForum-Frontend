/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { Comment, Avatar } from 'antd';
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
type repliesType = [CommentType];

const AntComment: React.FC<{
  comment: CommentType;
  replies: repliesType | [];
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
      datetime={<span>{myTime(createTimestamp)}</span>}
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
