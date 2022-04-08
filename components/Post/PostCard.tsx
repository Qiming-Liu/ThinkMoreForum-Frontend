import React from 'react';
import NextLink from 'next/link';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Link,
  Typography,
} from '@mui/material';
import { updatePostViewCount } from '../../services/Public';
// @ts-ignore
import { strip } from '../../utils/htmlParser.ts';

const getInitials = (name = '') =>
  name
    .replace(/\s+/, ' ')
    .split(' ')
    .slice(0, 2)
    .map((v) => v && v[0].toUpperCase())
    .join('');

export interface PostProps {
  id: string;
  createTimestamp: any;
  postUsers: {
    headImgUrl: string;
    username: string;
    id: string;
  };
  headImgUrl: string;
  context: string;
  title: string;
  commentCount: number;
  viewCount: number;
  followCount: number;
}

interface PostCardProps {
  post: PostProps;
  id: string;
  authorAvatar: string;
  authorName: string;
  authorId: string;
  headImg: string | never;
  createTimeStamp: any;
  abstract: string | never;
  title: string;
  commentCount: number;
  viewCount: number;
  followCount: number;
  [x: string]: any;
}

const PostCard = (props: PostCardProps) => {
  const {
    id,
    authorAvatar,
    authorName,
    authorId,
    headImg,
    createTimeStamp,
    abstract,
    title,
    commentCount,
    viewCount,
    followCount,
    ...other
  } = props;

  const generatedUrl = `/post/${id}`;
  const userProfileUrl = `/profile/${authorName}`;

  const handleClick = () => {
    updatePostViewCount(id);
  };

  return (
    <Card
      sx={{
        '& + &': {
          mt: 3,
        },
        borderRadius: '20px',
      }}
      elevation={4}
      {...other}
    >
      {headImg && (
        <NextLink href={generatedUrl ?? ''} passHref>
          <Link href={generatedUrl ?? ''} onClick={handleClick}>
            <CardMedia component="a" image={headImg} sx={{ height: 280 }} />
          </Link>
        </NextLink>
      )}
      <CardContent>
        <NextLink href={generatedUrl ?? ''} passHref>
          <Link
            href={generatedUrl ?? ''}
            color="textPrimary"
            component="a"
            variant="h5"
            onClick={handleClick}
          >
            {title}
          </Link>
        </NextLink>
        {abstract && (
          <Typography
            color="textSecondary"
            sx={{
              height: 48,
              mt: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
            }}
            variant="body1"
          >
            {strip(abstract)}
          </Typography>
        )}
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexWrap: 'wrap',
            mt: 2,
          }}
        >
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
            }}
          >
            <NextLink
              href={{
                pathname: userProfileUrl,
              }}
              passHref
            >
              <Avatar src={authorAvatar} sx={{ mr: 2 }}>
                {getInitials(authorName)}
              </Avatar>
            </NextLink>
            <NextLink
              href={{
                pathname: userProfileUrl,
              }}
              passHref
            >
              <Typography variant="subtitle2">{`By ${authorName}`}</Typography>
            </NextLink>
            <Typography variant="subtitle2" sx={{ ml: 2 }}>
              {createTimeStamp}
            </Typography>
          </Box>
          <Typography
            align="right"
            color="textSecondary"
            sx={{ flexGrow: 1 }}
            variant="body2"
          >
            {`${viewCount} views • ${commentCount} comments • ${followCount} followers`}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PostCard;
