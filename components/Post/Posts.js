import React from 'react';
import useSWR from 'swr';
import { Typography } from '@mui/material';
import PostCard from './PostCard';
import { getVisiblePostsByCategoryId } from '../../services/Public';
import MyTime from '../../utils/myTime';

const fetchPostsDataSWR = async ({
  categoryId,
  currentPage,
  sizePerPage,
  sortParams,
}) => {
  const { data } = await getVisiblePostsByCategoryId(
    categoryId,
    currentPage,
    sizePerPage,
    sortParams,
  );
  return data;
};

const Posts = ({
  categoryId,
  currentPage,
  sizePerPage,
  sortParams,
  displayHeadImg,
  displayAbstract,
  showPinPost,
}) => {
  const { data, error } = useSWR(
    {
      categoryId,
      currentPage,
      sizePerPage,
      sortParams,
    },
    fetchPostsDataSWR,
  );
  if (error) return <Typography variant="body1">Failed to load</Typography>;
  if (!data) return <Typography variant="body1">Loading</Typography>;
  return data.map(
    ({
      id,
      createTimestamp,
      postUsers: {
        headImgUrl: authorAvatar,
        username: authorName = 'N.A.',
        id: authorId,
      },
      headImgUrl,
      context,
      title,
      commentCount,
      viewCount,
      followCount,
    }) => {
      if (showPinPost === id) {
        return null;
      }
      return (
        <PostCard
          key={id}
          id={id}
          authorAvatar={authorAvatar || '/logo.png'}
          authorName={authorName}
          authorId={authorId}
          headImg={displayHeadImg && (headImgUrl || '/logo.png')}
          createTimeStamp={MyTime(createTimestamp)}
          abstract={displayAbstract && context}
          title={title}
          commentCount={commentCount}
          viewCount={viewCount}
          followCount={followCount}
        />
      );
    },
  );
};

export default Posts;
