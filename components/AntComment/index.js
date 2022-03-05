import React from 'react';
import { Comment, Tooltip, Avatar } from 'antd';
import moment from 'moment';

const AntComment = ({ children }) => {
  return (
    <Comment
      actions={[<span key="comment-nested-reply-to">Reply to</span>]}
      author="Han Solo"
      avatar={
        <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
      }
      content={
        <p>
          We supply a series of design principles, practical patterns and high
          quality design resources (Sketch and Axure).
        </p>
      }
      datetime={
        <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
          <span>{moment().fromNow()}</span>
        </Tooltip>
      }
    >
      {children}
    </Comment>
  );
};

export default AntComment;
