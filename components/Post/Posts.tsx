import React from 'react';
import useSWR from 'swr';
import { Typography } from '@mui/material';
import PostCard, { PostProps } from './PostCard';
import { getVisiblePostsByCategoryId } from '../../services/Public';
import MyTime from '../../utils/myTime';

interface FetchPostsDataSWRProps {
  categoryId: string;
  currentPage: number | never;
  sizePerPage: number | never;
  sortParams: any;
}

interface PostsProps {
  categoryId: string;
  currentPage: number | never;
  sizePerPage: number | never;
  sortParams: any;
  displayHeadImg: boolean | never;
  displayAbstract: boolean | never;
  showPinPost: string | boolean;
}

const fetchPostsDataSWR = async ({
  categoryId,
  currentPage,
  sizePerPage,
  sortParams,
}: FetchPostsDataSWRProps) => {
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
}: PostsProps) => {
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
    }: PostProps) => {
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
