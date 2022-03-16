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

const getInitials = (name = '') =>
  name
    .replace(/\s+/, ' ')
    .split(' ')
    .slice(0, 2)
    .map((v) => v && v[0].toUpperCase())
    .join('');

const PostCard = (props) => {
  const {
    id,
    authorAvatar,
    authorName,
    headImg,
    createTimeStamp,
    abstract,
    title,
    commentCount,
    viewCount,
    followCount,
    ...other
  } = props;

  const handleClick = () => {
    updatePostViewCount(id);
  };

  const generatedUrl = `/post/${id}`;
  const userProfileUrl = `/profile/${authorName}`;

  return (
    <Card
      sx={{
        '& + &': {
          mt: 3,
        },
      }}
      {...other}
    >
      {headImg && (
        <NextLink href={generatedUrl ?? ''} onClick={handleClick} passHref>
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
            {abstract.length > 200
              ? `${abstract
                  .replace(/<.*?>| [</].*?>/gi, '')
                  .substring(0, 200)}...`
              : abstract.replace(/<.*?>| [</].*?>/gi, '')}
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
            <NextLink href={userProfileUrl} passHref>
              <Link href={userProfileUrl}>
                <Avatar src={authorAvatar} sx={{ mr: 2 }}>
                  {getInitials(authorName)}
                </Avatar>
              </Link>
            </NextLink>
            <NextLink href={userProfileUrl} passHref>
              <Link href={userProfileUrl}>
                <Typography variant="subtitle2">
                  {`By ${authorName}`}
                </Typography>
              </Link>
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
            {`${viewCount} views • ${commentCount} comments • ${followCount} users following`}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PostCard;
