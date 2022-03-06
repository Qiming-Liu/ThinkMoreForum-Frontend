import React from 'react';
import { Comment, Tooltip, Avatar } from 'antd';
import myTime from '../../utils/myTime';

const AntComment = ({ children, comment }) => {
  const { commentUsers, context, createTimestamp } = comment;
  return (
    <Comment
      actions={[<span key="comment-nested-reply-to">Reply</span>]}
      author={commentUsers.username}
      avatar={<Avatar src={commentUsers.profileImgUrl} />}
      content={context}
      datetime={
        <Tooltip>
          <span>{myTime(createTimestamp)}</span>
        </Tooltip>
      }
    >
      {children}
    </Comment>
  );
};

export default AntComment;
