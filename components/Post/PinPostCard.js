import React from 'react';
import { Chip } from '@mui/material';
import PostCard from './PostCard';
import MyTime from '../../utils/myTime';

const PinPostCard = ({ pinPostInfo, displayHeadImg, displayAbstract }) => {
  return (
    <div
      style={{ position: 'relative', marginBottom: '24px', marginTop: '18px' }}
    >
      <PostCard
        key={pinPostInfo.id}
        id={pinPostInfo.id}
        authorAvatar={pinPostInfo.postUsers.headImgUrl || '/logo.png'}
        authorName={pinPostInfo.postUsers.username}
        authorId={pinPostInfo.postUsers.id}
        headImg={displayHeadImg && (pinPostInfo.headImgUrl || '/logo.png')}
        createTimeStamp={MyTime(pinPostInfo.createTimestamp)}
        abstract={displayAbstract && pinPostInfo.context}
        title={pinPostInfo.title}
        commentCount={pinPostInfo.commentCount}
        viewCount={pinPostInfo.viewCount}
        followCount={pinPostInfo.followCount}
      />
      <Chip
        color="primary"
        size="large"
        label="PinPost"
        style={{
          position: 'absolute',
          top: displayHeadImg ? '20px' : '31px',
          left: displayHeadImg ? '20px' : '',
          right: displayHeadImg ? '' : '60px',
          boxShadow: '0px 0px 2px 1px rgba(0, 0, 0, 0.3)',
        }}
      />
    </div>
  );
};

export default PinPostCard;
